<template>
  <div class="mavonEditor">
    <v-snackbar
      top
      v-model="snackbar"
      :dark="this.$vuetify.theme.dark"
      :light="!this.$vuetify.theme.dark"
    >
      {{ savetips.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-btn color="error" class="mr-4" @click="reset"> 清 空 </v-btn>
      <v-btn color="primary" @click="saveContent"> 保 存 </v-btn>
      <v-text-field
        v-model="title"
        :counter="20"
        :rules="titleRules"
        label="标题"
        required
      ></v-text-field>

      <client-only>
        <mavonEditor
          ref="md"
          :toolbars="markdownOption"
          defaultOpen="preview"
          :content="handbook"
          v-model="handbook"
          @save="saveMarkdown"
        />
      </client-only>
    </v-form>
  </div>
</template>
<script>
import mavonEditor from '~/components/Editor.vue'
export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      valid: true,
      titleRules: [
        (v) => !!v || '请输入标题',
        (v) => (v && v.length <= 20) || '标题少于20个字符',
      ],
      title: '',
      text: `Hello, I'm a snackbar`,
      snackbar: false,
      savetips: '',
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      handbook: `@[toc](目录) \n #### how to use mavonEditor in nuxt.js`,
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      console.log(this.$refs.form.validate())
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    saveMarkdown() {
      console.log(this.handbook)
      console.log(this.$refs.md.d_render)
      console.log(this.$refs.md.d_value)
    },
    async saveContent() {
      if (this.$refs.form.validate()) {
        let p = {
          title: this.title,
          content: this.$refs.md.content,
          createTime: new Date(),
        }
        console.log(p)
        let res = await this.$axios.post('http://localhost:9099/insert', {
          ...p,
        })
        this.snackbar = true
        console.log(res)
        this.savetips = res.data
      }
    },
  },
}
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
  position: sticky;
}
</style>