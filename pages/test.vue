<template>
  <div>
    <h1>{{ $t('about.title') }}</h1>
    <button @click="changeLang('zh-CN')" v-if="$i18n.local != 'zh-CN'">
      中文
    </button>
    <button @click="changeLang('en-US')" v-if="$i18n.local != 'en-US'">
      英文
    </button>
     <NuxtLink to="/about">
      Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    changeLang(l) {
      console.log(this.$i18n.locale)
      if (process.client) {
        console.log('aaaaaaaaaaaaaa')
        sessionStorage.setItem('locales', l)
      }
      this.$store.commit('SET_LANG', l);
      this.$i18n.locale = l
      // 此时语言就会显示为切换的语言
    },
  },
}
</script>