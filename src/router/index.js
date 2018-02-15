import Vue from 'vue'
import Router from 'vue-router'
import ClearScore from '@/components/ClearScore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ClearScore',
      component: ClearScore
    }
  ]
})
