<template>
  <div id="app">
    <header class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="#" class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#left-drawer'}">
          <i class="mdui-icon material-icons">menu</i>
        </a>
        <a href="https://www.hzgeek.top/" target="_blank" class="mdui-typo-headline">衡中极客圈</a>
        <a href="javascript:;" class="mdui-typo-title">博客</a>

        <div class="mdui-toolbar-spacer"></div>

        <div class="avatar">
          <div
            class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-hoverable"
            mdui-tooltip="{content: '青章浚'}"
            mdui-menu="{target: '#appbar-avatar-popover'}"
          >
            <img
              src="//cdn.jsdelivr.net/gh/JupiterJun/picture/hzgeekAvatar/6002cdd177fcd4410f050f73.jpg"
              width="32"
              height="32"
            />
          </div>
          <ul class="mdui-menu" id="appbar-avatar-popover">
            <li class="mdui-menu-item">
              <a href="javascript:;" class="mdui-ripple">
                <i class="mdui-menu-item-icon mdui-icon material-icons">&#xe851;</i>你好，青章浚
              </a>
            </li>
            <li class="mdui-menu-item">
              <a href="javascript:;" class="mdui-ripple">
                <i class="mdui-menu-item-icon mdui-icon material-icons">&#xe879;</i>退出登录
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <div class="mdui-drawer mdui-shadow-16" id="left-drawer">
      <div class="mdui-card" id="drawer-head">
        <div class="mdui-card-media">
          <img src="//cdn.w3cbus.com/mdui.org/docs/assets/docs/img/card.jpg" />
          <div class="mdui-card-media-covered">
            <div class="mdui-card-primary">
              <div class="mdui-card-primary-title">衡中极客圈</div>
              <div class="mdui-card-primary-subtitle">官方博客</div>
            </div>
            <div class="mdui-card-actions">
              <button class="mdui-btn mdui-ripple mdui-ripple-white">关于我们</button>
              <button class="mdui-btn mdui-ripple mdui-ripple-white">站点条款</button>
            </div>
          </div>
        </div>
      </div>

      <ul class="mdui-list mdui-color-white">
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">move_to_inbox</i>
          <div class="mdui-list-item-content">Inbox</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon mdui-icon material-icons">send</i>
          <div class="mdui-list-item-content">Outbox</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon"></i>
          <div class="mdui-list-item-content">Trash</div>
        </li>
        <li class="mdui-list-item mdui-ripple">
          <i class="mdui-list-item-icon"></i>
          <div class="mdui-list-item-content">Spam</div>
        </li>
      </ul>
    </div>

    <div class="mdui-container mdui-typo main">
      <div class="mdui-row mdui-valign mdui-m-y-2">
        <router-view />
      </div>
    </div>

    <footer class="mdui-color-white">
      <div class="mdui-container mdui-typo">
        <div class="mdui-row">
          <div
            class="mdui-col-xs-6 mdui-col-md-2 mdui-col-offset-md-5 mdui-col-offset-xs-3 mdui-m-y-2 mdui-text-center"
          >
            <img
              src="@/assets/logo-chupin.png"
              class="mdui-img-fluid"
              onclick="window.open('https:\/\/www.hzgeek.top');"
            />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
#drawer-head {
  text-align: center;
}
body {
    min-height: 100%;
    background-image: url(//cdn.jsdelivr.net/gh/JupiterJun/picture/background.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

footer {
    height: 84px;
    width: 100%;
    position: relative;
    bottom: 0px;
    left: 0px;
}

</style>

<script>
localStorage.setItem('debug', 'leancloud*');
</script>
