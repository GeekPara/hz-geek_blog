<template>
  <div class="mdui-col-xs-12 mdui-col-md-10 mdui-col-offset-md-1" id="articleListHolder">
    <div
      class="mdui-card mdui-hoverable mdui-m-y-2"
      v-for="article in articles"
      :key="article.title"
    >
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
    </div>
  </div>
</template>

<script>
let layout = []
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      articles: layout
    }
  },
  created() {
    const AV = this.AV;
    (async function () {
      const query = new AV.Query('Article');
      query.descending('createdAt');
      const articles = await query.find();
      for (let article of articles) {
        const [headImage, title, subtitle, author, date] = [
          article.get('headImage') || '//cdn.w3cbus.com/mdui.org/docs/assets/docs/img/card.jpg',
          article.get('title'),
          article.get('subtitle'),
          article.get('author'),
          article.createdAt
        ];
        const query = new AV.Query('_Users');
        const user = await query.get(author.id);
        const authorName = user.get('username');
        var avatar = `//cdn.jsdelivr.net/gh/JupiterJun/picture/hzgeekAvatar/${author.id}.jpg`;
        var showDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        layout.push({
          title: title,
          subtitle: subtitle,
          headImage: headImage,
          avatar: avatar,
          authorName: authorName,
          date: showDate
        })
      }
    })()
  }
}
</script>
