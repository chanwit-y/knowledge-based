// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'

import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

import '@shikijs/vitepress-twoslash/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
}
} satisfies Theme

