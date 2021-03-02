<template>
  <div class="about">
    about the post
    <NuxtLink to="/test"> Home page </NuxtLink>
    <div class="profile-wrap">
      <v-card>
        <v-card-title>Kian_</v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p></v-card-text
        >
        <v-card-actions>
          <v-btn class="mx-2" fab dark small color="primary">
            <v-icon dark> mdi-github </v-icon>
          </v-btn></v-card-actions
        >
      </v-card>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.about {
  min-height: 800px;
  .profile-wrap {
    background-image: linear-gradient(-90deg, #00bcd4, #1890ff);
    border-radius: 10px;
    max-width: 680px;
    margin: 0 auto;
    position: relative;
    padding: 30px;
    top: 100px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  }
}
</style>