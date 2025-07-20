import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Incomes from '../views/IncomesView.vue'
import Orders from '../views/OrdersView.vue'
import Sales from '../views/SalesView.vue'
import Stocks from '../views/StocksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/incomes',
      name: 'incomes',
      component:Incomes,
    },
    {
      path: '/orders',
      name: 'orders',
      component:Orders,
    },
    {
      path: '/sales',
      name: 'sales',
      component:Sales,
    },
    {
      path: '/stocks',
      name: 'stocks',
      component:Stocks,
    },
  ],
})

export default router
