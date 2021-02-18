import Vue from 'vue';
import App from './App.vue';
import mdui from 'mdui';
import 'mdui/dist/css/mdui.min.css';
import router from './router';
import AV from 'leancloud-storage';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

AV.init({
  appId: "cGsb2KHXLfjY2o1Gg2hOSHgS-gzGzoHsz",
  appKey: "9nusFqKOHcUvSScKrbfj5wcn",
  serverURL: "https://cgsb2khx.lc-cn-n1-shared.com"
});
//AV.User.logIn('test', 'test');

Vue.config.productionTip = false;
Vue.prototype.AV = AV;
Vue.prototype.mdui = mdui;

Vue.prototype.getUserInfo = function (userObj) {
  var avatar, username;
  if (!userObj.get('avatar')) avatar = `//api.multiavatar.com/${userObj.get('username')}.svg`;
  else avatar = userObj.get('avatar');
  username = userObj.get('username');
  return { avatar: avatar, username: username };
}

Vue.use(mdui);
Vue.use(mavonEditor);
// app.use() 的第二个参数是可选的

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
