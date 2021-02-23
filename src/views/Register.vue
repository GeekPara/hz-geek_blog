<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset="0" md="6" offset-md="3">
        <v-card>
          <v-card-title>注册：衡中极客圈</v-card-title>
          <v-card-subtitle>注册的账号默认没有文章发布权限，但可以使用其他功能。仅极客圈成员可以发布文章。</v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-text-field label="用户名" outlined v-model="username" hint="支持中文，用户名即昵称" />
              <v-text-field label="邮箱" outlined v-model="email" hint="不要和系统中已有邮箱重复" />
              <v-text-field
                v-model="password"
                outlined
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="密码"
                hint="确保你的密码强度足够高"
                @click:append="show1 = !show1"
                @keyup.enter="signinSubmit()"
              />注册衡中极客圈即代表您同意我们的许可条款
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signinSubmit()">注册</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let AV;
export default {
  methods: {
    signinSubmit: function () {
      if (!this.username || !this.email || !this.password)
        return this.$emit('showSnackbar', '把信息填完整再注册', 'error');
      if (this.email.indexOf("@") == -1 || this.email.indexOf(".") == -1)
        return this.$emit('showSnackbar', "邮箱格式不对", "error");
      const user = new AV.User();
      user.setUsername(this.username);
      user.setPassword(this.password);
      user.setEmail(this.email);
      try {
        user.signUp();
        this.$emit('showSnackbar', "注册成功！请查收验证邮件~", "success");
        this.$router.push('/');
      } catch (error) {
        if (error.code == 202) return this.$emit('showSnackbar', "该用户名已被占用", "error");
        if (error.code == 203) return this.$emit('showSnackbar', "该邮箱已被占用", "error");
        this.$emit('showSnackbar', "注册失败，未知原因", "error");
      }
    }
  },
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
      show1: false,
    }
  },
  created: function () {
    AV = this.AV
  }
}
</script>
