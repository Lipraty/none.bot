import './style.css'
import { $, h, hroot } from '../lib/helper'
import { setupCounter } from '../lib/main'
import { footer } from './footer'

// const timeCount = 10

const app = hroot`#app`

app(h('div', {},
  h('a', { class: 'logo-warpper' },
    h('img', { src: 'https://nonebot.dev/logo.png', class: 'logo ani-logo', style: 'position: absolute;', alt: 'nb logo' }),
    h('img', { src: 'https://koishi.chat/logo.png', class: 'logo', alt: 'koishi logo' })
  ),
  h('h1', {}, 'None.Bot'),
  h('h2', {}, `将在 10 秒后跳转到 Koishi.chat`),
  h('div', { class: 'card' },
    h('button', { id: 'counter', class: 'button is-primary' })
  ),
  footer()
))

setupCounter($<HTMLButtonElement>('#counter')!)
