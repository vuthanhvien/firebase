import Vue from 'vue'
import Router from 'vue-router'

// Containers
const Posts = () => import('@/views/Posts')
const FileManager = () => import('@/views/FileManager')
const Users = () => import('@/views/Users')
const DefaultContainer = () => import('@/containers/DefaultContainer')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/Post',
      name: 'Home',
      component: DefaultContainer,
      children: [
         
        {
          path: '/file',
          name: 'FileManager',
          component: FileManager
        }, 
        {
          path: '/users',
          name: 'User',
          component: Users
        },
        {
          path: '/:id',
          name: 'Posts',
          component: Posts
        },
      ]
    },
    // {
    //   path: '/pages',
    //   redirect: '/pages/404',
    //   name: 'Pages',
    //   component: {
    //     render(c) { return c('router-view') }
    //   },
    //   children: [
    //     {
    //       path: '404',
    //       name: 'Page404',
    //       component: Page404
    //     },
    //     {
    //       path: '500',
    //       name: 'Page500',
    //       component: Page500
    //     },
    //     {
    //       path: 'login',
    //       name: 'Login',
    //       component: Login
    //     },
    //     {
    //       path: 'register',
    //       name: 'Register',
    //       component: Register
    //     }
    //   ]
    // }
  ]
})
