<template>
  <div id="app">
    <header class="mdui-appbar mdui-appbar-fixed">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="#" class="mdui-btn mdui-btn-icon" mdui-drawer="{target: '#left-drawer'}">
          <i class="mdui-icon material-icons">menu</i>
        </a>
        <router-link to="/" class="mdui-typo-headline">衡中极客圈</router-link>
        <router-link to="/" class="mdui-typo-title">博客</router-link>

        <div class="mdui-toolbar-spacer"></div>

        <div class="avatar">
          <div
            class="mdui-btn mdui-btn-dense mdui-hoverable"
            :mdui-tooltip="tooltipUsername"
            mdui-menu="{target: '#appbar-avatar-popover'}"
            :class="{ 'mdui-btn-icon' : isLogin }"
          >
            <img :src="avatar" width="32" height="32" v-if="isLogin" />
            <div v-else mdui-dialog="{target: '#loginDialog'}">请登录</div>
          </div>
          <ul class="mdui-menu" id="appbar-avatar-popover" v-if="isLogin">
            <li class="mdui-menu-item">
              <a href="javascript:;" class="mdui-ripple">
                <i class="mdui-menu-item-icon mdui-icon material-icons">&#xe851;</i>个人空间
              </a>
            </li>
            <li class="mdui-menu-item">
              <a mdui-dialog="{target: '#confirmLogoutDialog'}" class="mdui-ripple">
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
              <div to="/" class="mdui-card-primary-subtitle">官方博客</div>
            </div>
            <div class="mdui-card-actions">
              <router-link to="/about" class="mdui-btn mdui-ripple mdui-ripple-white">关于我们</router-link>
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
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>

    <div class="mdui-dialog" id="loginDialog" v-if="!isLogin">
      <div class="mdui-card">
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">登录：衡中极客圈</div>
          <div class="mdui-card-primary-subtitle">
            没有账号？
            <a @click="signUp()" href="">注册一个</a>
          </div>
        </div>
        <div class="mdui-card-content">
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">用户名/邮箱</label>
            <input class="mdui-textfield-input" v-model="username" type="text" />
          </div>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">密码</label>
            <input
              class="mdui-textfield-input"
              v-model="password"
              type="password"
              @keyup.enter="login()"
            />
          </div>
          <div>
            想不起来密码？
            <a @click="resetPwd()" href="">重置密码</a>
          </div>
        </div>
        <div class="mdui-card-actions mdui-text-center">
          <button class="mdui-btn mdui-ripple mdui-color-theme-accent mdui-btn-block" @click="login()">登录</button>
        </div>
      </div>
    </div>

    <div class="mdui-dialog" id="signUp-dialog">
      <div class="mdui-dialog-title">创建新账户</div>
      <div class="mdui-dialog-content">
        用户名即昵称，支持中文。注册后请查收验证邮件。
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">用户名</label>
          <input class="mdui-textfield-input" id="signUp-userName" type="text" />
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">邮箱</label>
          <input class="mdui-textfield-input" id="signUp-email" type="email" />
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">密码</label>
          <input class="mdui-textfield-input" id="signUp-password" type="password" />
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">确认密码</label>
          <input class="mdui-textfield-input" id="signUp-confirmPassword" type="password" />
        </div>
      </div>
      <div class="mdui-dialog-actions mdui-text-center">
        <button class="mdui-btn mdui-ripple mdui-btn-block" id="signUp-btn">注册</button>
      </div>
    </div>

    <div class="mdui-dialog" id="resetPassword-dialog">
      <div class="mdui-dialog-title">重置密码</div>
      <div class="mdui-dialog-content">
        输入账户绑定的邮箱，点击邮件中的链接来重置密码。
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">邮箱</label>
          <input class="mdui-textfield-input" id="reset-email" type="email" />
        </div>
      </div>
      <div class="mdui-dialog-actions mdui-text-center">
        <button class="mdui-btn mdui-ripple mdui-btn-block" id="reset-btn">确定</button>
      </div>
    </div>

    <div class="mdui-dialog" id="confirmLogoutDialog">
      <div class="mdui-dialog-title">退出登录？</div>
      <div class="mdui-dialog-content">乃确定不是手滑了？</div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>手滑了~</button>
        <button class="mdui-btn mdui-ripple" @click="logout()">确定退出</button>
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

a{text-decoration: none;}
a:hover{}
</style>

<script>
localStorage.setItem('debug', 'leancloud*');
let currentUser
export default {
  name: 'Main',
  methods: {
    logout: function () {
      this.AV.User.logOut();
      location.reload();
    },
    login: function () {
      var AV = this.AV;
      var mdui = this.mdui;
      var userName = this.username;
      var password = this.password;
      if (userName != "" && password != "") {
        if (userName.indexOf("@") != -1 && userName.indexOf(".") != -1) {
          AV.User.loginWithEmail(userName, password).then(() => {
            mdui.snackbar("登录成功~",);
            document.location.href = "/";
          }, () => {
            mdui.snackbar("邮箱或密码错误~",);
          });
        }
        else {
          AV.User.logIn(userName, password).then(() => {
            mdui.snackbar("登录成功~",);
            document.location.href = "/";
          }, () => {
            mdui.snackbar("用户名或密码错误~",);
          });
        }
      }
      else {
        mdui.snackbar("请输入用户名和密码~",);
      }
    }
  },
  computed: {
    isLogin: function () {
      if (currentUser) return true;
      return false;
    },
    tooltipUsername: function () {
      if (!currentUser) return `{content: '点击登录'}`;
      return `{content: '${currentUser.get('username')}'}`;
    },
    avatar: function () {
      if (!currentUser) return null;
      if (!currentUser.get('avatar')) return `https://api.multiavatar.com/${currentUser.get('username')}.svg`;
      return currentUser.get('avatar');
    }
  },
  created() {
    const AV = this.AV;
    currentUser = AV.User.current();
  }
}
</script>
