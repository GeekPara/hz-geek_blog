<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="文章标题" v-model="title"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="副标题" v-model="subTitle" hint="可以填写文章摘要"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field label="唯一标签" v-model="onlyTag" hint="用于生成文章Url，最好只用英文、数字、连字符"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-file-input
            show-size
            truncate-length="16"
            accept="image/*"
            prepend-icon="mdi-file-image"
            label="点击此处选择一张头图"
            v-model="headImageRaw"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col elevation="1">
          <mavon-editor v-model="content" :codeStyle="codeStyle" style="z-index:1;" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="submitArticle" block color="accent">发布</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      codeStyle: 'dark',
      title: '',
      subTitle: '',
      onlyTag: '',
      content: '',
      headImage: '',
      headImageRaw: null,
      headImageB64: '',
    }
  },
  watch: {
    headImageRaw: function () {
      if (!this.headImageRaw) return;
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.headImageRaw);
      reader.onload = () => {
        const bytes = new Uint8Array(reader.result);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        this.headImageB64 = btoa(binary);
      }
    }
  },
  methods: {
    submitArticle: async function () {
      if (!this.title) return this.$emit('showSnackbar', "得起个标题才能发布哦", "error");
      if (!this.content) return this.$emit('showSnackbar', "不写内容文章发你妈呢", "error");
      if (!this.onlyTag) this.onlyTag = this.md5(this.title + this.content);

      let AV = this.AV;
      if (this.headImageRaw) {
        let url = `https://api.github.com/repos/HZGeek/HZGeek-BlogImages/contents/`
        let filename = this.md5(this.headImageRaw) + '.' + this.headImageRaw.name.split('.').pop();
        let token = await this.getGithubToken();
        try {
          let response = await fetch(url + filename + `?access_token=${token}`, {
            method: 'PUT',
            headers: {
              accept: 'application/vnd.github.v3+json',
              //Authorization: `token ${token}`
            },
            body: `{
              "message": "Article:${this.onlyTag}",
              "content": "${this.headImageB64}"
            }`,
          });
          if (response.status >= 200 && response.status < 300) {
            let res = await response.json();
            console.log(res);
            this.headImage = `//cdn.jsdelivr.net/gh/HZGeek/HZGeek-BlogImages@master/${filename}`
          } else {
            this.$emit('showSnackbar', '头图上传出错', "error");
            let res = await response.json();
            console.log(res);
            return;
          }
        } catch (error) {
          this.$emit('showSnackbar', '头图上传出错', "error");
          console.log(error);
          return;
        }
      }

      if (!this.subTitle) this.subTitle = this.content.substring(0, 32);
      if (!this.headImage) this.headImage = '//cdn.jsdelivr.net/gh/HZ-Geek/hz-geek_blog@master/src/assets/bkg.svg'

      const article = new AV.Object('Article');
      article.set('title', this.title);
      article.set('subtitle', this.subTitle);
      article.set('headImage', this.headImage);
      article.set('content', this.content);
      article.set('onlyTag', this.onlyTag);
      article.set('author', AV.User.current());
      try {
        article.save()
        this.$emit('showSnackbar', "文章发布成功", "success");
        this.$router.push(`/article/${article.get('onlyTag')}`);
      } catch (error) {
        if (error.code == 137) return this.$emit('showSnackbar', "onlyTag与现有重复，请更换", "error");
        console.error(error);
        this.$emit('showSnackbar', "文章保存失败，详细信息请查看控制台", "error");
      }
    },
    uploadImage: function (image) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(image);
      reader.onload = ()=> {
        const bytes = new Uint8Array(reader.result);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary);
      }
    },
  }
}
</script>
