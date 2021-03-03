import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// define routes
import MasterGuide from './components/MasterGuide.vue'
import Strategy from './components/Strategy.vue'
import Tournament from './components/Tournament.vue'

const routes = [
  { path: '/', redirect: '/guide' },
  { path: '/guide', component: MasterGuide },
  { path: '/strategy', component: Strategy },
  { path: '/tournament', component: Tournament }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
