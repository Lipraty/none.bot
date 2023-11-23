import { h } from "../lib/helper";

export function footer() {
  return h('footer', { class: 'footer' },
    h('div', { class: 'content has-text-centered' },
      h('p', {},
        'Powered by ',
        h('a', { href: 'https://github.com/Lipraty', target: '_blank' }, 'Lipraty'),
        ' | ',
        h('span', {}, '本项目非 NoneBot 官方项目，与 NoneBot 官方无关。'),
      ),
    )
  )
}

