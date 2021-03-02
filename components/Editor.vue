<template>
  <mavon-editor
    ref="md"
    :toolbars="toolbars"
    :defaultOpen="defaultOpen"
    :subfield="subfield"
    :toolbarsFlag="toolbarsFlag"
    :codeStyle="codeStyle"
    :previewBackground="previewBackground"
    v-model="contentInner"
    @imgAdd="$imgAdd"
  />
</template>

<script>
export default {
  props: {
    toolbars: {
      type: Object,
      default: () => {},
    },
    defaultOpen: {
      type: String,
      default: '',
    },
    subfield: {
      type: Boolean,
      default: true,
    },
    // content: {
    //   type: String,
    //   default: '',
    // },
    toolbarsFlag: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: this.value,
    }
  },
  computed: {
    codeStyle() {
      return this.$vuetify.theme.dark ? 'atom-one-dark' : 'atom-one-light'
    },
    previewBackground() {
      return this.$vuetify.theme.dark ? '#fbfbfb' : '#fbfbfb'
    },
    contentInner: {
      get() {
        return this.value
      },
      set(newVAl) {
        this.content = newVAl
      },
    },
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      this.$axios({
        url: 'http://localhost:9099/upload',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((data) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        console.log(data)
        debugger
        this.$refs.md.$img2Url(pos, data.data.url)
      })
    },
  },
}
</script>

<style scoped>
</style>