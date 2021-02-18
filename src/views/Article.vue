<template>
  <div class="mdui-col-xs-12 mdui-col-md-10 mdui-col-offset-md-1" id="articleListHolder">
    <div class="mdui-card mdui-hoverable mdui-m-t-2">
      <div class="mdui-card-media" style="height: 20rem;">
        <img :src="headImage" class="mdui-img-fluid" />
        <div class="mdui-card-media-covered mdui-card-media-covered-gradient">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">{{title}}</div>
            <div class="mdui-card-primary-subtitle">{{subtitle}}</div>
          </div>
        </div>
      </div>
      <div class="mdui-card-media-covered mdui-card-media-covered-top">
        <div class="mdui-card-header">
          <img class="mdui-card-header-avatar" :src="avatar" />
          <div class="mdui-card-header-title">{{authorName}}</div>
          <div class="mdui-card-header-subtitle">{{date}}</div>
        </div>
      </div>
    </div>
    <div class="mdui-card">
      <div class="mdui-card-content mdui-typo">
        
      </div>

      <div class="mdui-card-actions">
        <button class="mdui-btn mdui-ripple">action 1</button>
        <button class="mdui-btn mdui-ripple">action 2</button>
        <button class="mdui-btn mdui-btn-icon mdui-float-right">
          <i class="mdui-icon material-icons">expand_more</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
let AV;
export default {
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
    //mdui = this.mdui;
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
