<template>
  <div class="mdui-col-xs-12 mdui-col-md-10 mdui-col-offset-md-1">
    <div
      class="mdui-card mdui-hoverable mdui-m-y-2"
      v-for="article in articles"
      :key="article.route"
    >
    <v-lazy>
      <router-link :to="article.route">
        <div class="mdui-card-media" style="height: 20rem;">
          <img :src="article.headImage" class="mdui-img-fluid" />
        </div>
        <div class="mdui-card-media-covered mdui-card-media-covered-top">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">{{article.title}}</div>
            <div class="mdui-card-primary-subtitle">{{article.subtitle}}</div>
          </div>
        </div>
        <div class="mdui-card-media-covered mdui-card-media-covered-gradient">
          <div class="mdui-card-header">
            <img class="mdui-card-header-avatar" :src="article.avatar" />
            <div class="mdui-card-header-title">{{article.authorName}}</div>
            <div class="mdui-card-header-subtitle">{{article.date}}</div>
          </div>
        </div>
      </router-link>
      </v-lazy>
    </div>
    
  </div>
</template>

<script>
//import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      articles: []
    }
  },
  created: async function () {
    const AV = this.AV;
    const query = new AV.Query('Article');
    query.descending('createdAt');
    const articles = await query.find();
    for (let article of articles) {
      const [headImage, title, subtitle, author, onlyTag, date] = [
        article.get('headImage') || '//cdn.w3cbus.com/mdui.org/docs/assets/docs/img/card.jpg',
        article.get('title'),
        article.get('subtitle'),
        article.get('author'),
        article.get('onlyTag'),
        article.createdAt
      ];
      const query = new AV.Query('_Users');
      var authorName, avatar
      try {
        const user = await query.get(author.id);
        authorName = this.getUserInfo(user).username;
        avatar = this.getUserInfo(user).avatar;
      }
      catch {
        authorName = '已注销的用户';
        avatar = '//api.multiavatar.com/anonymous.svg';
      }
      var showDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      this.articles.push({
        title: title,
        subtitle: subtitle,
        headImage: headImage,
        avatar: avatar,
        authorName: authorName,
        route: '/article/' + onlyTag,
        date: showDate
      })
    }
  }
}
</script>
