
<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>衡中极客圈</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar class="mr-10" size="32" v-on="on" v-bind="attrs" v-if="isLogin">
            <img :src="avatar" />
          </v-avatar>
        </template>
        <span>{{tooltipUsername}}</span>
      </v-tooltip>

      <v-dialog width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" elevation="2" v-on="on" v-bind="attrs">登录</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">登录：衡中极客圈</v-card-title>

          <v-card-text>
            <v-text-field label="用户名/邮箱" outlined v-model="usernameL"></v-text-field>
            <v-text-field label="密码" outlined v-model="passwordL"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="login()">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>123</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <v-container>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
        :fixed="fixed"
      >
        <template v-slot:activator>
          <v-btn v-if="isLogin" v-model="fab" color="blue darken-2" dark fab >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <router-link to="/write/new-article" v-if="canWrite">
          <v-btn fab dark small color="green">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </router-link>
        <v-btn fab dark small color="indigo">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-main>
  </v-app>
</template>

<script>
localStorage.setItem('debug', 'leancloud*');
let AV, mdui, loginDlg, signupDlg, rstpswdDlg;
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
      }, (error) => {
        if (error.code == 219) return mdui.snackbar("该邮箱并未注册",);
        mdui.snackbar("发送重置邮件失败，未知原因",);
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
      }, (error) => {
        if (error.code == 202) return mdui.snackbar("该用户名已被占用",);
        if (error.code == 203) return mdui.snackbar("该邮箱已被占用",);
        mdui.snackbar("注册失败，未知原因",);
      });
    },
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
    tooltipUsername: function () {
      if (!this.currentUser) return null;
      return this.getUserInfo(this.currentUser).username;
    },
    avatar: function () {
      if (!this.currentUser) return null;
      return this.getUserInfo(this.currentUser).avatar;
    },
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
      direction: 'top',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      fixed: true,
      transition: 'scale-transition',
    };
  },
  created: async function () {
    AV = this.AV;
    mdui = this.mdui;
    this.canWrite = await this.isEditor();
    this.isLogin = this.isLogingIn();
  }
}
</script>
