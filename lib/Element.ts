import { $, isEmpty } from './helper'

export interface ElementOptions {
	attrs?: ENodeProps
	parser?: boolean
}

export interface ENodeProps {
	[key: string]: any
}

export type ENodeCallback = (this: ENode, proxyData: ProxyData) => void

export interface ProxyData {
	props?: ENodeProps,
	children?: (ENode | string)[]
	[key: string]: any
}

class ENode {
	private element: HTMLElement = document.createElement('div')
	private proxyDatas: ProxyData = {}

	constructor(public tag: string, public props: ENodeProps, public children: (ENode | string)[]) {
		this.proxyDatas = this.createProxy()
	}

	private createProxy() {
		return new Proxy(this.proxyDatas, {
			set: (target, key, value) => {
				if (key === 'props') {
					this.props = value
				} else if (key === 'children') {
					this.children = value
				}
				this.update()
				return true
			}
		})
	}

	private _updateProps() {
		for (const key in this.props) {
			this.element.setAttribute(key, this.props[key]);
		}
	}

	private _updateChildren() {
		this.element.innerHTML = ''


		for (const child of this.children) {
			if (typeof child === 'string') {
				this.element.appendChild(document.createTextNode(child));
			} else {
				this.element.appendChild(child.parser());
			}
		}
	}

	parser(node?: ENode) {
		this.element = document.createElement(node?.tag || this.tag)
		this.proxyDatas = this.createProxy()

		this._updateProps()
		this._updateChildren()

		return this.element;
	}

	update(data: ProxyData = {}) {
		if (!isEmpty(data)) {
			this.proxyDatas = Object.assign(this.proxyDatas, data)
		} else if (this.element) {
			this._updateProps()
			this._updateChildren()
		}

		return this.element;
	}

	static patch(selector: string) {
		const element = $<HTMLElement>(selector)

		if (!element) {
			throw new Error('ROOTElement not found')
		}

		return (node: ENode) => {
			element.innerHTML = ''
			element.appendChild(node.parser())
		}
	}
}

function createElement(name: string, options: ElementOptions, ...children: (ENode | string)[]): ENode | HTMLElement
function createElement(name: string, ...children: (ENode | string)[]): ENode | HTMLElement
function createElement(...args: any[]): ENode | HTMLElement {
	const [name, options, ...children] = args as [string, ElementOptions | (ENode | string)[], ...(ENode | string)[]]
	if (typeof options === 'object') {
		const e = new ENode(name, (options as ElementOptions).attrs || {}, children)
		return (options as ElementOptions).parser ? e.parser() : e
	}
	return new ENode(name, {}, [...(options as (ENode | string)[]), ...children])
}

export {
	createElement as h
}

