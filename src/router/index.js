import Vue from 'vue'
import VueRouter from 'vue-router'
import Invoices from '../views/Invoices.vue'
import Invoice from '../views/Invoice.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: Invoices,
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuth) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/invoices/:invoiceId',
    name: 'Invoice',
    component: Invoice
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})



export default router
