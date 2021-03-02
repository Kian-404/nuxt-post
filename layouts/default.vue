<!--
 * @Version: 
 * @Company: Venus
 * @Date: 2021-02-24 14:27:36
 * @LastEditors: Kian_
 * @LastEditTime: 2021-02-24 15:51:06
-->
<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div class="sub-list">
        <v-tabs>
          <v-tab v-for="(item, index) in items" :key="index" :to="item.router">
            {{ $t(item.text) }}</v-tab
          >
        </v-tabs>
      </div>
      <div class="theme">
        <v-icon @click="toggleTheme" color="yellow lighten-1"
          >mdi-theme-light-dark</v-icon
        >
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <lottie-player
      class="lottie"
      :src="lottieList[parseInt(Math.random() * lottieList.length)].src"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px"
      loop
      autoplay
    ></lottie-player> -->
    <v-footer :absolute="!fixed" app align="center">
      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>Kian_</strong>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dark: true,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Kian_ Post',
      selectedItem: 1,
      items: [
        { text: 'about.home', icon: 'mdi-clock', router: '/' },
        { text: 'about.Category', icon: 'mdi-flag', router: '/category' },
        { text: 'about.title', icon: 'mdi-account', router: '/about' },
        { text: 'about.edit', icon: 'mdi-account', router: '/edit' },
      ],
      lottieList: [
        {
          text: 'cat',
          src: 'https://assets8.lottiefiles.com/packages/lf20_tr1pjkop.json',
        },
        {
          text: 'cat',
          src: 'https://assets4.lottiefiles.com/packages/lf20_sdklqzgq.json',
        },
      ],
    }
  },
  methods: {
    toggleTheme() {
      this.dark = !this.dark
      this.$vuetify.theme.dark = this.dark
    },
  },
}
</script>
<style lang="scss">
.sub-item {
  color: #fff !important;
  text-decoration: none;
  padding: 10px;
}
.lottie {
  position: fixed;
  right: 0px;
  bottom: 0px;
  z-index: 10000;
}
.theme {
  margin-left: 20px;
}
</style>