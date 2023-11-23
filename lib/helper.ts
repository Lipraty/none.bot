export function $<T extends Element>(selector: string) {
  return document.querySelector<T>(selector)
}

export function isEmpty(value: any) {
  if (value == null) return true;
  else if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  else if (typeof value === 'object') {
    for (var prop in value) {
      if (value.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  } else if (typeof value === 'number') return isNaN(value);
  else return false;
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

export function h(tag: string, props: ENodeProps, ...children: (ENode | string)[]) {
  return new ENode(tag, props, children)
}

export function hroot(strings: TemplateStringsArray, ...value: any) {
  return ENode.patch(strings.join(''))
}
