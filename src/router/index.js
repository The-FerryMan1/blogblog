import { createRouter, createWebHistory } from 'vue-router'
import defaultLayout from '@/views/layouts/defaultLayout.vue'
import guestLayout from '@/views/layouts/guestLayout.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const routes = [
  {
    path: '/',
    component: defaultLayout,
    children: [
      {
        path: '/',
        component: () => import('@/components/dashboard/dasboard.vue'),
        name: 'home',
        meta: {requiresAuth: true}
      },
      {
        path: 'profile',
        component: ()=> import('@/components/dashboard/profilePanel.vue'),
        name: 'profile',
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    component: guestLayout,
    children : [
      {
        path: '/',
        component: () => import('@/components/dashboard/unAuthedHome.vue'),
        name: 'UnAuthedHome'
      },
      {
        path: 'login',
        component: ()=> import('@/components/login/loginPage.vue'),
        name: 'login'
      },
      {
        path: 'signUp',
        component: () => import('@/components/signup/signupPage.vue'),
        name: 'signUp'
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not found',
    component: () => import('@/components/404/404page.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


const preUser = ()=>{
  return new Promise((resolve, reject)=>{
    const unsub = onAuthStateChanged(getAuth(), (user)=>{
      unsub()
      resolve(user)
    },
    reject
  )
  })
}

router.beforeEach(async(to, from)=>{
  if(to.meta.requiresAuth){
    if(await preUser()){

    }else{
      return { 
        name: 'UnAuthedHome',
        query: {redirect: "home"}
      }
    }
  }
  
})


export default router
