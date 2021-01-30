import Vue from 'vue'
import App from './App.vue'
import mdui from 'mdui'
import 'mdui/dist/css/mdui.min.css'
import router from './router'
import AV from 'leancloud-storage'

AV.init({
  appId: "cGsb2KHXLfjY2o1Gg2hOSHgS-gzGzoHsz",
  appKey: "9nusFqKOHcUvSScKrbfj5wcn",
  serverURL: "https://cgsb2khx.lc-cn-n1-shared.com"
});

Vue.config.productionTip = false
Vue.prototype.AV = AV

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(mdui);
