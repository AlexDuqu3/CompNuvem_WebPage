import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import Card from '../components/Card.vue'
import Transaction from '../components/Transaction.vue'
import Transactions from '../components/transactions/Transactions.vue'
import User from "../components/users/User.vue"
import Admins from "../components/admins/Admins.vue"
import Vcards from "../components/vcards/Vcards.vue"
import DefaultCategories from "../components/defaultCategories/DefaultCategories.vue"
import PaymentTypes from "../components/paymentTypes/PaymentTypes.vue"
import Admin from "../components/admins/Admin.vue"
import DefaultCategory from "../components/defaultCategories/DefaultCategory.vue"
import CreditTransaction from "../components/vcards/CreditTransaction.vue"
import ChangePassword from "../components/auth/ChangePassword.vue"

const routes = [
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login, 
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register, 
  },
  {
    path: '/password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/card',
    name: 'Card',
    component: Card
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: Transaction
  },
  {
    path: '/vcards',
    name: 'Vcards',
    component: Vcards,
  },
  {
    path: '/admins',
    name: 'Admins',
    component: Admins,
  },
  {
    path: '/admins',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admins/new',
    name: 'NewAdmin',
    component: Admin,
    props: () => ({ id: null })
  },
  {
    path: '/defaultcategories',
    name: 'DefaultCategories',
    component: DefaultCategories,
  },
  {
    path: '/defaultCategory/new',
    name: 'NewDefaultCategory',
    component: DefaultCategory,
    props: () => ({ id: null })
  },
  {
    path: '/CreditTransaction/:phone_number',
    name: 'NewCreditTransaction',
    component: CreditTransaction,
    props: route => ({ phone_number: parseInt(route.params.phone_number) })
  },
  {
    path: '/paymenttypes',
    name: 'PaymentTypes',
    component: PaymentTypes,
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User,
    //props: true
    // Replaced with the following line to ensure that id is a number
    props: route => ({ id: parseInt(route.params.id) })
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

 
import store from '../store' 
 
router.beforeEach((to, from, next) => { 
  if ((to.name == 'Login') || (to.name == 'Register') || (to.name == 'Home')) { 
    
    next() 
    return 
  } 
  
  if (!store.state.user) { 
    next({ name: 'Login' }) 
    return 
  }
  /*  BRANCH GC PERFIL
   if (to.name == 'User') { 
    if ((store.state.user.type == 'A') || (store.state.user.id == to.params.id)) { 
      next() 
      return 
    } 
    next(false) 
    return 
  }
  */
  else {
    next()
  }
})

export default router
