import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import AddRecipes from '@/components/crud/AddRecipes'
import Edit from '@/components/crud/Edit'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/add-recipe',
      name: 'AddRecipes',
      component: AddRecipes
    },

    {
      path: '/edit/:edit_recipe',
      name: 'Edit',
      component: Edit
    }
  ]
})

// Apply route guards before each route
// this function will fire before the router loaded in
router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  //check if theres a component that has an object meta with a property of requiresAuth: true
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check the state of user status
    let user = firebase.auth().currentUser
    //if user has logged in, he can go this component(Gmap) which is the homepage
    if(user){
      //user signed in, proceed to route
      next()
    } else {
      //no user signed in, redirect to login
      next({ name: 'Login' })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router
