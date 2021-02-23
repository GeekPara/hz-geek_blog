<template>
  <div>
    <v-container>
      <v-text-field label="文章标题" v-model="title"></v-text-field>
      <v-text-field label="副标题（可以填写文章摘要）" v-model="subTitle"></v-text-field>
      <v-text-field label="唯一标签" v-model="onlyTag"></v-text-field>唯一标签请使用英文字母大小写、数字、英文短横线（“-”）且不要与已有的重复。
      届时你文章的访问地址为https://test.hzgeek.com/article/[唯一标签]
      <mavon-editor v-model="content" :codeStyle="codeStyle" />
      <v-btn @click="submitArticle">发布</v-btn>
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
      headImage: '//cdn.jsdelivr.net/gh/HZ-Geek/hz-geek_blog@master/src/assets/bkg.svg'
    }
  },
  methods: {
    submitArticle: function () {
      let AV = this.AV;

      const todo = new AV.Object('Article');
      todo.set('title', this.title);
      todo.set('subtitle', this.subTitle);
      todo.set('headImage', this.headImage);
      todo.set('content', this.content);
      todo.set('onlyTag', this.onlyTag);
      todo.set('author', AV.User.current());

      todo.save().then((todo) => {
        alert('success')
        console.log(`保存成功。objectId：${todo.id}`);
      }, (error) => {
        alert('faild! please check console log')
        console.log(`保存失败：${error}`);
      });
    }
  }
}
</script>
