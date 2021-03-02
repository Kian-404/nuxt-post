let locale;
if (process.client) {
  console.log('cccccccccccccc');
  locale = sessionStorage.getItem('locales');
  console.log(locale);
}
export const state = () => ({
  locales: ['en-US', 'zh-CN'],
  locale: locale || 'zh-CN'
})

export const mutations = {
  // 此处为设置locale
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
      if (process.client) {
        console.log('aaaaaaaaaaaaaa');
        sessionStorage.setItem('locales', locale);
      }
    }
  }
}