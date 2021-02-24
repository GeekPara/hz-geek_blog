<template>
  <v-container>
    <v-row v-for="article in articles" :key="article.onlyTag">
      <v-col cols="12" offset="0" md="10" offset-md="1">
        <v-lazy>
          <v-card :to="article.route">
            <v-card-title>{{article.title}}</v-card-title>
            <v-card-subtitle class="pb-0">{{article.subtitle}}</v-card-subtitle>
            <v-img class="white--text align-end" height="200px" :src="article.headImage">
              <v-container>
                <v-row>
                  <v-col cols="1">
                    <v-avatar left>
                      <v-img :src="article.avatar"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="11">
                    <div class="text-subtitle-1 transition-swing">{{article.authorName}}</div>
                    <div class="text-subtitle-2 transition-swing">{{article.date}}</div>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      articles: [],
    }
  },
  awaitComputed: {
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
