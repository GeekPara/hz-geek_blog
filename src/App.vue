<template>
  <v-app id="inspire">
    <!--顶栏AppBar-->
    <v-app-bar app>
      <v-container class="py-0 fill-height">
        <v-app-bar-title>衡中极客圈</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-responsive max-width="260">
          <v-text-field
            dense
            filled
            hide-details
            rounded
            clearable
            placeholder="搜索..."
            prepend-inner-icon="mdi-cloud-search"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <!--侧栏Drawer-->
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app :key="isLogin">
      <!--Drawer顶部用户信息-->
      <v-list-item class="px-2">
        <v-list-item-avatar v-if="isLogin">
          <v-img :src="loginAvatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-icon v-else>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-list-item-icon>

        <v-list-item-title>
          <span v-if="isLogin">{{loginUsername}}</span>
          <v-dialog max-width="500px" v-else>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" elevation="2" v-on="on" v-bind="attrs" v-if="!isLogin">登录</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">登录：衡中极客圈</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field label="用户名/邮箱" v-model="usernameL"></v-text-field>
                  <v-text-field
                    v-model="passwordL"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="密码"
                    @click:append="show1 = !show1"
                    @keyup.enter="login()"
                  ></v-text-field>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <!--Drawer主体列表-->
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="isLogin">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="canWrite" to="/write/new-article">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Write an Article</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-dialog max-width="500px" v-if="isLogin" v-model="dialog.logout">
          <template v-slot:activator="{ on, attrs }" v-if="isLogin">
            <v-list-item link v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">你确定不是手滑了嘛</span>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialog.logout = false">我手滑了</v-btn>
              <v-btn color="primary" text @click="logout()">确定退出</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-list-item link v-if="!isLogin">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Creat a New Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--主体部分：容器、回顶按钮、Snackbar-->
    <v-main class="grey lighten-3">
      <v-container>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
      <v-fab-transition>
        <v-btn color="pink" dark bottom right fab fixed v-show="btnFlag" @click="backTop">
          <v-icon>mdi-arrow-up-thick</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-snackbar
        timeout="2000"
        :value="theSnackbar.isOpened"
        :color="theSnackbar.color"
      >{{theSnackbar.content}}</v-snackbar>
    </v-main>

    <!--页脚Footer-->
    <v-footer color="primary lighten-1" padless inset app absolute>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">{{ link }}</v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>衡中极客圈</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
localStorage.setItem('debug', 'leancloud*');
let AV, loginDlg, signupDlg, rstpswdDlg;
export default {
  name: 'Main',
  methods: {
    logout: async function () {
      AV.User.logOut();
      await this.refresh();
    },
    login: async function () {
      var userName = this.usernameL;
      var password = this.passwordL;
      if (userName != "" && password != "") {
        try {
          if (userName.indexOf("@") != -1 && userName.indexOf(".") != -1)
            await AV.User.loginWithEmail(userName, password);
          else await AV.User.logIn(userName, password);
          this.snackbar("登录成功~", "success");
          await this.refresh();
        } catch (error) {
          if (error.code == 216) return this.snackbar("您的邮箱还未验证", "error");
          if (error.code == 210) return this.snackbar("用户名或密码不正确", "error");
          if (error.code == 211) return this.snackbar("该用户不存在", "error");
          if (error.code == 219) return this.snackbar("密码错误次数过多，15分钟后再试", "error");
          return this.snackbar("登录失败，未知原因", "error");
        }
      }
      else
        return this.snackbar("请输入用户名和密码~", "error");
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
      if (!this.emailR) return this.snackbar("请填写邮箱~", "error");
      AV.User.requestPasswordReset(this.emailR).then(() => {
        this.snackbar("重置邮件已发送~", "error")
        rstpswdDlg.close();
      }, (error) => {
        if (error.code == 219) return this.snackbar("该邮箱并未注册", "error");
        this.snackbar("发送重置邮件失败，未知原因", "error");
      })
    },
    signupSubmit: function () {
      var userName = this.username;
      var email = this.email;
      var password = this.password;
      var confirmPassword = this.confirm;
      if (userName == "" || email == "" || password == "" || confirmPassword == "") return this.snackbar("把信息填完整再注册哦~", "error")
      if (confirmPassword != password) return this.snackbar("两次输入的密码不一致~", "error");
      if (email.indexOf("@") == -1 || email.indexOf(".") == -1) return this.snackbar("邮箱格式不对", "error");
      const user = new AV.User();
      user.setUsername(userName);
      user.setPassword(password);
      user.setEmail(email);
      user.signUp().then(() => {
        this.snackbar("注册成功！请查收验证邮件~", "error");
        signupDlg.close();
      }, (error) => {
        if (error.code == 202) return this.snackbar("该用户名已被占用", "error");
        if (error.code == 203) return this.snackbar("该邮箱已被占用", "error");
        this.snackbar("注册失败，未知原因", "error");
      });
    },
    backTop: function () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    scrollToTop: function () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    refresh: async function () {
      this.canWrite = await this.isEditor();
      this.isLogin = this.isLogingIn();
      if (AV.User.current()) this.loginUsername = this.getUserInfo(AV.User.current()).username;
      if (AV.User.current()) this.loginAvatar = this.getUserInfo(AV.User.current()).avatar;
      this.dialog.logOut = false;
    },
    snackbar: function (content, clolor) {
      this.theSnackbar.content = content;
      this.theSnackbar.color = clolor;
      this.theSnackbar.isOpened = Math.random();
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
    activeFab() {
      switch (this.tabs) {
        case 'one': return { class: 'purple', icon: 'account_circle' }
        case 'two': return { class: 'red', icon: 'edit' }
        case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
        default: return {}
      }
    },
  },
  data: function () {
    return {
      confirmError: false,
      passwordError: false,
      loginUsername: null,
      loginAvatar: null,
      username: '',
      email: '',
      password: '',
      confirm: '',
      usernameL: '',
      emailL: '',
      passwordL: '',
      emailR: '',
      canWrite: false,
      isLogin: false,
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
      fab: false,
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
      btnFlag: false,
      show1: false,
      dialog: {
        logout: false,
      },
      theSnackbar: {
        isOpened: false,
        color: 'info',
        content: 'This is a snackbar.'
      }
    };
  },
  created: async function () {
    AV = this.AV;
    await this.refresh();
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

}
</script>
