import Vue from 'vue'
import Router from 'vue-router'
import Portfolio from '../views/Portfolio'
import Single from '../views/Single'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Portfolio
    },
    {
      path: '/:item',
      name: 'portfolio-item',
      component: Single
    }
  ]
})
