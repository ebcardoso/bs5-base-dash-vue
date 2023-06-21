import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthService from '@/services/AuthService'

async function routerGuarder(to:any, from:any, next:any) {
  const token = localStorage.getItem('access_token');
  if (token) {
    await AuthService.verifyToken(token).then(response => {
      next();
    }).catch(e => {
      localStorage.setItem('access_token', '')
      localStorage.setItem('refresh_token', '')
      next('/auth/login');
    });
  } else {
    next('/auth/login');
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    beforeEnter: routerGuarder,
    component: () => import('@/views/HomeView.vue')
  },
  //Auth
  {
    path: '/auth/login',
    name: 'authLoginPath',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/auth/forgot_password',
    name: 'authForgotPasswordPath',
    component: () => import('@/views/auth/PasswordForgotView.vue')
  },
  {
    path: '/auth/reset_password/confirm/:uid/:token/',
    name: 'authResetPasswordConfirmPath',
    component: () => import('@/views/auth/ResetPasswordConfirmView.vue')
  },
  //Profile
  {
    path: '/profile',
    name: 'profilePath',
    beforeEnter: routerGuarder,
    component: () => import('@/views/auth/ProfileView.vue')
  },
  //Users
  {
    path: '/users',
    name: 'usersIndexPath',
    beforeEnter: routerGuarder,
    component: () => import('@/views/users/UsersIndexView.vue')
  },
  {
    path: '/users/:id',
    name: 'usersShowPath',
    beforeEnter: routerGuarder,
    component: () => import('@/views/users/UsersShowView.vue')
  },
  {
    path: '/users/new',
    name: 'usersCreatePath',
    beforeEnter: routerGuarder,
    component: () => import('@/views/users/UsersCreateView.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'usersEditPath',
    beforeEnter: routerGuarder,
    component: () => import('@/views/users/UsersEditView.vue')
  },
  //Page Not Found
  { 
    path: '/:pathMatch(.*)',
    name: 'error404Path',
    component: () => import('@/views/pages/Error404View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
