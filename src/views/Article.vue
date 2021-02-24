<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset="0" md="10" offset-md="1">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="1">
                <v-avatar left>
                  <v-img :src="avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="11">
                <div class="text-subtitle-1 transition-swing">{{authorName}}</div>
                <div class="text-subtitle-2 transition-swing">{{date}}</div>
              </v-col>
            </v-row>
          </v-container>
          <v-img class="white--text align-end" height="200px" :src="headImage">
            <v-card-title>{{title}}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">{{subtitle}}</v-card-subtitle>
          <v-card-text>
            <v-container>
              <Markdown :content="content" />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn icon color="success">
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn icon color="error">
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            <v-btn icon color="warning">
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn icon color="info">
              <v-icon>mdi-comment</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.markdown-body pre code {
  background-color: #00000000 !important;
}
</style>

<script>
import Markdown from '../components/Markdown.vue';
let AV;
export default {
  components: { Markdown },
  data: function () {
    return {
      title: '',
      subtitle: '',
      headImage: '',
      avatar: '',
      authorName: '',
      date: '',
      content: ''
    };
  },
  computed: {
  },
  created: async function () {
    AV = this.AV;
    var onlyTag = this.$route.params.onlyTag;
    const query = new AV.Query('Article');
    query.equalTo('onlyTag', onlyTag);
    const article = await query.first();
    var author;
    var date = new Date(date);
    [this.headImage, this.title, this.subtitle, author, this.content, date] = [
      article.get('headImage') || '//cdn.w3cbus.com/mdui.org/docs/assets/docs/img/card.jpg',
      article.get('title'),
      article.get('subtitle'),
      article.get('author'),
      article.get('content'),
      article.createdAt,
    ];
    const query2 = new AV.Query('_Users');
    try {
      const user = await query2.get(author.id);
      this.authorName = this.getUserInfo(user).username;
      this.avatar = this.getUserInfo(user).avatar;
    }
    catch {
      this.authorName = '已注销的用户';
      this.avatar = '//api.multiavatar.com/anonymous.svg';
    }
    this.date = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
}
</script>
