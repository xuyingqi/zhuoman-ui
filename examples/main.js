import Vue from 'vue'
import App from './App.vue'
import ZhuoManUI from '../packages'
Vue.config.productionTip = false
Vue.use(ZhuoManUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
