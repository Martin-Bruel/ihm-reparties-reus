import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import { DraggableDirective } from '@braks/revue-draggable';

Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false
Vue.directive('draggable', DraggableDirective)
new Vue({
  render: h => h(App),
}).$mount('#app')
