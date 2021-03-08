<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <div class="text-center">
        <!-- <logo />
        <vuetify-logo /> -->
      </div>
      <v-hover open-delay="109" v-for="(item, index) in postList" :key="index">
        <v-card @click="Detail(item)">
          <v-card-title class="headline">
            {{ item.title }}
          </v-card-title>
          <v-card-text>
            <p>
              {{ item.desc }}
            </p>
            <!-- <v-img
              :src="item.pic"
              lazy-src="https://picsum.photos/id/11/100/60"
            >
              <div class="fill-height bottom-gradient"></div>
            </v-img> -->
          </v-card-text>
          <v-card-actions>
            <v-icon>mdi-clock-time-eight</v-icon>
            <span>{{ item.createTime }}</span>
            <v-spacer />
            <!-- <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-hover>
      <div class="pagination" v-if="postList.length > 0">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-container class="max-width">
                <v-pagination
                  v-model="page"
                  class="my-4"
                  :length="count"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      count: 0,
      postList: [],
    }
  },
  watch: {
    page: function (newVAl, oldVal) {
      console.log(newVAl)
      this.getPostList()
    },
  },
  methods: {
    Detail(item) {
      this.$router.push(`/post/${item._id}`)
      this.testRequset()
    },
    async testRequset() {
      const res = await this.$axios.get('/api/test')
      // console.log(res)
    },
    async getPostList() {
      const res = await this.$axios.get('http://localhost:9099/data', {
        params: {
          currentPage: this.page,
          pageSize: 10,
        },
      })
      // console.log(res)
      this.postList = res.data.list
      this.count = res.data.count
    },
  },
  created() {
    this.getPostList()
  },
}
</script>
<style>
.v-card {
  margin: 20px 0;
}
</style>
