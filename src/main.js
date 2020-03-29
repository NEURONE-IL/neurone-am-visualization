import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// Import stylefile
require("./assets/style/style.scss");


//EventBus
window.EventBus = new Vue();

//Notifications
import Notifications from 'vue-notification'
Vue.use(Notifications);
// Global alerts
import Alerts from '@/components/mixin/alerts.js'
Vue.mixin(Alerts)

// Init component
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
