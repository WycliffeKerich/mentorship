import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehviour(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  // const publicPages = [
  //   '/authentication/login',
  //   '/authentication/signup',
  //   '/authentication/forgot-password',
  //   '/'
  // ]
  // const authRequired = !publicPages.includes(to.path)
  // const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  // if (authRequired && !loggedIn) {
  //   next('/login')
  // } else {
  //   next()
  // }
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
