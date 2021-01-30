import Vue from 'vue'
import App from './App.vue'
import mdui from 'mdui'
import 'mdui/dist/css/mdui.min.css'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(mdui);
