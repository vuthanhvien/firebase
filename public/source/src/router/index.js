import Vue from 'vue'
import Router from 'vue-router'

// Containers
const Posts = () => import('@/views/Posts')
const FileManager = () => import('@/views/FileManager')
const Users = () => import('@/views/Users')
const DefaultContainer = () => import('@/containers/DefaultContainer')

const Register = () => import('@/views/pages/Register')
const Login = () => import('@/views/pages/Login')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')


Vue.use(Router)

const guard = function (to, from, next) {
  // check for valid auth token
  const token = localStorage.getItem('token');
  let tokenObj = {};
  if (token) {
    try {
      tokenObj = JSON.parse(token);
    } catch (e) {
      tokenObj = {};
    }
  }
  if (tokenObj.token) {
    next();
  } else {
    window.location.href = "/#/login";
  }
};


export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '/500',
      name: 'Page500',
      component: Page500
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      redirect: '/Post',
      name: 'Home',
      component: DefaultContainer,
      beforeEnter: (to, from, next) => {
        guard(to, from, next);
      },
      children: [

        {
          path: 'filemanager',
          name: 'FileManager',
          component: FileManager
        },
        {
          path: 'users',
          name: 'User',
          component: Users
        },
        {
          path: ':id',
          name: 'Posts',
          component: Posts
        },
      ]
    },
  ]
})
