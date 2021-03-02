<template>
  <div class="detail">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="8">
        <h1>{{ postdetail.title }}</h1>
        <span>- {{ postdetail.createTime }}</span>
        <!-- <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          contain
          :src="postdetail.pic"
        ></v-img> -->
        <div class="mavonEditor">
            <Editor
              v-if="postdetail"
              ref="md"
              :toolbars="markdownOption"
              defaultOpen="preview"
              :subfield="false"
              :toolbarsFlag="false"
              :content="postdetail.content"
              v-model="postdetail.content"
            />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Editor from '~/components/Editor.vue'
export default {
  component: {
    Editor,
  },
  data() {
    return {
      postdetail: {},
      articleId: '',
      markdownOption: {
        // preview: true, // 预览
      },
    }
  },
  methods: {
    async getPostDetail() {
      const res = await this.$axios.get(`http://localhost:9099/query`, {
        params: {
          articleId: this.articleId,
        },
      })
      console.log(res)
      this.postdetail = res.data.detail[0]
    },
  },
  created() {
    this.articleId = this.$route.params.id
    console.log(this.$route.params.id)
    this.getPostDetail()
  },
}
</script>

<style lang="scss" scoped>
.detail {
  .mavonEditor {
    position: sticky;
    .v-note-panel {
      border-radius: 10px;
    }
  }
}
</style>