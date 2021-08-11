import Vue from 'vue'
import VueRouter from 'vue-router'
import Invoices from '../views/Invoices.vue'
import Invoice from '../views/Invoice.vue'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: Invoices
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/invoice/:invoiceId',
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
