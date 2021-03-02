export default function ({
  isHMR, app, store, route, redirect, query, req
}) {

  // 从服务端请求头cookie中获取语种
  let locale;
  debugger
  // cookie中没有的情况下，获取路由参数中的语种，再没有就默认为中文
  if (!locale) {
    debugger;
    locale = query.lang || 'zh-CN';
  }
  // 设置语种
  store.commit('SET_LANG', locale); // set store
  app.i18n.locale = store.state.locale;

  // 跳转该去的地方， isHMR我还没看是什么。
  if (isHMR) {
    return;
  }
  else if (!query.lang) {
    return redirect(route.fullPath);
  }
}