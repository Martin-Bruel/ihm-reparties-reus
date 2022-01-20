import Vue from 'vue'
import Router from 'vue-router'
import Socket from '@/components/Socket'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Socket',
      component: Socket
    }
  ]
})
