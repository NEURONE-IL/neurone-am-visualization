import Vue from 'vue'
import Router from 'vue-router'
import General from './views/General.vue'
import Configuration from '@/views/Configuration.vue'
import Init from '@/views/Init.vue'
import End from '@/views/End.vue'
import store from '@/store'
import axios from 'axios'

Vue.use(Router);

// Function to verify if the session is init
function isInit(to, from, next) {

  axios.get(`${process.env.VUE_APP_API_URL}/ifsession`)
    .then(response => {

      if (response.data.status) {
        console.log("response", response)
        store.commit("setMetrics", {
          configuration: {
            metrics: response.data.metrics,
            principal: response.data.principal,
            limit: response.data.limit,
            option: response.data.option
          }
        })
        next('/init')
      }
      else {
        next('/configuration')
      }
    }).catch(error => {
      next('/configuration')
    })
}

// REgister all routes
var router = new Router({
  routes: [
    {
      path: '/',
      name: 'configuration',
      component: Configuration,
      beforeEnter: isInit
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: Configuration
    },
    {
      path: '/general',
      name: 'general',
      component: General
    },
    {
      path: '/init',
      name: 'init',
      component: Init
    },
    {
      path: '/end',
      name: 'end',
      component: End
    }
  ]
})
export default router;
