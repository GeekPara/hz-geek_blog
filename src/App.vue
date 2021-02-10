<template>
  <div id="app">
    <!--头顶AppBar-->
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
            <div v-else @click="plsLogin()">请登录</div>
          </div>
          <ul class="mdui-menu" id="appbar-avatar-popover" v-show="isLogin">
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

    <!--左侧Drawer-->
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
      <!--主体渲染部分-->
      <div class="mdui-row mdui-valign mdui-m-y-2">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>

    <div class="mdui-dialog" id="login-dialog" v-if="!isLogin">
      <!--登录Dialog-->
      <div class="mdui-card">
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">登录：衡中极客圈</div>
          <div class="mdui-card-primary-subtitle mdui-typo">
            没有账号？
            <a @click="signUp()">注册一个</a>
          </div>
        </div>
        <div class="mdui-card-content">
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">用户名/邮箱</label>
            <input class="mdui-textfield-input" v-model="usernameL" type="text" />
          </div>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">密码</label>
            <input
              class="mdui-textfield-input"
              v-model="passwordL"
              type="password"
              @keyup.enter="login()"
            />
          </div>
          <div class="mdui-typo">
            想不起来密码？
            <a @click="resetPwd()">重置密码</a>
          </div>
        </div>
        <div class="mdui-card-actions mdui-text-center">
          <button
            class="mdui-btn mdui-ripple mdui-color-theme-accent mdui-btn-block"
            @click="login()"
          >登录</button>
        </div>
      </div>
    </div>

    <div class="mdui-dialog" id="signUp-dialog" v-if="!isLogin">
      <!--注册Dialog-->
      <div class="mdui-dialog-title">创建新账户</div>
      <div class="mdui-dialog-content">
        新注册用户默认仅有评论权限，仅极客圈成员有文章发布权限。
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">用户名</label>
          <input class="mdui-textfield-input" v-model="username" type="text" />
          <div class="mdui-textfield-error">不允许使用这个用户名</div>
          <div class="mdui-textfield-helper">用户名即外显昵称，支持中文</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">邮箱</label>
          <input class="mdui-textfield-input" v-model="email" type="email" />
          <div class="mdui-textfield-error">邮箱格式有误</div>
          <div class="mdui-textfield-helper">请在注册后查收验证邮件激活账户</div>
        </div>
        <div
          class="mdui-textfield mdui-textfield-floating-label"
          :class="{ 'mdui-textfield-invalid': passwordError }"
        >
          <label class="mdui-textfield-label">密码</label>
          <input class="mdui-textfield-input" v-model="password" type="password" />
          <div class="mdui-textfield-error">两次输入的密码不一致</div>
          <div class="mdui-textfield-helper">确保您的密码强度足够高</div>
        </div>
        <div
          class="mdui-textfield mdui-textfield-floating-label"
          :class="{ 'mdui-textfield-invalid': confirmError }"
        >
          <label class="mdui-textfield-label">确认密码</label>
          <input class="mdui-textfield-input" v-model="confirm" type="password" />
          <div class="mdui-textfield-error">两次输入的密码不一致</div>
          <div class="mdui-textfield-helper">再输一遍，以确认您的密码没有输入错误</div>
        </div>
      </div>
      <div class="mdui-dialog-actions mdui-text-center">
        <button
          class="mdui-btn mdui-ripple mdui-color-theme-accent mdui-btn-block"
          @click="signupSubmit"
        >注册</button>
      </div>
    </div>

    <div class="mdui-dialog" id="resetPassword-dialog" v-if="!isLogin">
      <!--重置密码Dialog-->
      <div class="mdui-dialog-title">重置密码</div>
      <div class="mdui-dialog-content">
        输入账户绑定的邮箱，点击邮件中的链接来重置密码。
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">邮箱</label>
          <input class="mdui-textfield-input" v-model="emailR" type="email" />
          <div class="mdui-textfield-error">邮箱格式有误</div>
        </div>
      </div>
      <div class="mdui-dialog-actions mdui-text-center">
        <button
          class="mdui-btn mdui-ripple mdui-color-theme-accent mdui-btn-block"
          @click="sendResetEmail()"
        >发送重置邮件</button>
      </div>
    </div>

    <div class="mdui-dialog" id="confirmLogoutDialog" v-if="isLogin">
      <!--确认登出Dialog-->
      <div class="mdui-dialog-title">退出登录？</div>
      <div class="mdui-dialog-content">乃确定不是手滑了？</div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>手滑了~</button>
        <button class="mdui-btn mdui-ripple" @click="logout()">确定退出</button>
      </div>
    </div>

    <footer class="mdui-color-white">
      <!--页脚-->
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
/* 
a{text-decoration: none;}
a:hover{text-decoration: underline;} */
</style>

<script>
localStorage.setItem('debug', 'leancloud*');
let AV, mdui, currentUser, loginDlg, signupDlg, rstpswdDlg;
export default {
  name: 'Main',
  methods: {
    plsLogin: function () {
      loginDlg = new mdui.Dialog('#login-dialog',);
      signupDlg = new mdui.Dialog('#signUp-dialog',);
      rstpswdDlg = new mdui.Dialog('#resetPassword-dialog',);
      loginDlg.open();
    },
    logout: function () {
      AV.User.logOut();
      location.reload();
    },
    login: function () {
      var userName = this.usernameL;
      var password = this.passwordL;
      if (userName != "" && password != "") {
        if (userName.indexOf("@") != -1 && userName.indexOf(".") != -1) {
          AV.User.loginWithEmail(userName, password).then(async () => {
            const roles = await AV.User.current().getRoles();
            if (!roles) {
              const query = new AV.Query('_Role');
              query.equalTo('name', 'Subscriber');
              query.first().then((Subscriber) => {
                Subscriber.getUsers().add(AV.User.current());
              }, () => mdui.snackbar("添加权限错误，请联系管理员",));
            }
            mdui.snackbar("登录成功~",);
            location.reload();
          }, (error) => {
            if (error.code == 216) return mdui.snackbar("您的邮箱还未验证",);
            if (error.code == 210) return mdui.snackbar("用户名或密码不正确",);
            if (error.code == 211) return mdui.snackbar("该用户不存在",);
            if (error.code == 219) return mdui.snackbar("密码错误次数过多，15分钟后再试",);
            mdui.snackbar("登录失败，未知原因",);
          });
        }
        else {
          AV.User.logIn(userName, password).then(async () => {
            const roles = await AV.User.current().getRoles();
            if (!roles) {
              const query = new AV.Query('_Role');
              query.equalTo('name', 'Subscriber');
              query.first().then((Subscriber) => {
                Subscriber.getUsers().add(AV.User.current());
              }, () => mdui.snackbar("添加权限错误，请联系管理员",));
            }
            mdui.snackbar("登录成功~",);
            location.reload();
          }, (error) => {
            if (error.code == 216) return mdui.snackbar("您的邮箱还未验证",);
            if (error.code == 210) return mdui.snackbar("用户名或密码不正确",);
            if (error.code == 211) return mdui.snackbar("该用户不存在",);
            if (error.code == 219) return mdui.snackbar("密码错误次数过多，15分钟后再试",);
            mdui.snackbar("登录失败，未知原因",);
          });
        }
      }
      else {
        mdui.snackbar("请输入用户名和密码~",);
      }
    },
    signUp: function () {
      loginDlg.close();
      signupDlg.open();
    },
    resetPwd: function () {
      loginDlg.close();
      rstpswdDlg.open();
    },
    sendResetEmail: function () {
      if (!this.emailR) return mdui.snackbar("请填写邮箱~",);
      AV.User.requestPasswordReset(this.emailR).then(() => {
        mdui.snackbar("重置邮件已发送~",)
        rstpswdDlg.close();
      }, () => {
        mdui.snackbar("电子邮件有误，该账户不存在",)
      })
    },
    signupSubmit: function () {
      var userName = this.username;
      var email = this.email;
      var password = this.password;
      var confirmPassword = this.confirm;
      if (userName == "" || email == "" || password == "" || confirmPassword == "") return mdui.snackbar("把信息填完整再注册哦~",)
      if (confirmPassword != password) return mdui.snackbar("两次输入的密码不一致~",);
      if (email.indexOf("@") == -1 || email.indexOf(".") == -1) return mdui.snackbar("邮箱格式不对",);
      const user = new AV.User();
      user.setUsername(userName);
      user.setPassword(password);
      user.setEmail(email);
      user.signUp().then(() => {
        mdui.snackbar("注册成功！请查收验证邮件~",);
        signupDlg.close();
      }, () => {
        mdui.snackbar("注册失败~可能是用户名或邮箱已被占用",);
      });
    }
  },
  watch: {
    confirm: function () {
      if (this.password == this.confirm) {
        this.confirmError = false;
        this.passwordError = false;
      }
      else this.confirmError = true;
    },
    password: function () {
      if (this.password == this.confirm) {
        this.passwordError = false;
        this.confirmError = false;
      }
      else this.passwordError = true;
    }
  },
  computed: {
    isLogin: function () {
      if (currentUser) return true;
      return false;
    },
    tooltipUsername: function () {
      if (!currentUser) return `{content: '点击登录'}`;
      return `{content: '${this.getUserInfo(currentUser).username}'}`;
    },
    avatar: function () {
      if (!currentUser) return null;
      return this.getUserInfo(currentUser).avatar;
    }
  },
  data: function () {
    return {
      confirmError: false,
      passwordError: false,
      username: '',
      email: '',
      password: '',
      confirm: '',
      usernameL: '',
      emailL: '',
      passwordL: '',
      emailR: ''
    };
  },
  created: function () {
    AV = this.AV;
    mdui = this.mdui;
    currentUser = AV.User.current();
  }
}
</script>
