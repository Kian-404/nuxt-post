<template>
  <v-app dark class="err-page">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
      <lottie-player
        class="err-404"
        src="https://assets6.lottiefiles.com/packages/lf20_rDB3bm.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
.err-page {
  text-align: center;
  h1 {
    font-size: 20px;
  }
  .err-404 {
    margin: 0 auto;
  }
}
</style>
