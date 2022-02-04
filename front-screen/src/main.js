// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vue2TouchEvents from 'vue2-touch-events'
import router from './router'
import { DraggablePlugin } from '@braks/revue-draggable';

Vue.use(DraggablePlugin)
Vue.use(VueRouter)
Vue.use(Vue2TouchEvents)


// Vue.use(VueNativeSock, 'ws://localhost:9090')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
