import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh-CN',  // 我这里默认语言为中文
    messages: {
      'en-US': require('@/locale/en-US.json'),
      'zh-CN': require('@/locale/zh-CN.json')
    }
  })

  app.i18n.path = (link) => {
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${link}?lang=/${app.i18n.locale}`
  }
}