import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import routesIn from "./routes";

import Login from '@/views/authentication/Login.vue';


const MainRoutes = {
  path: '/app',
  meta: {
    requiresAuth: true
  },
  redirect: '/app',
  children: [
      {
          name: 'Dashboard',
          path: '/app/dashboard',
          component: () => import('@/views/pages/DashboardPage.vue'),
      },  
  ]
};


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
   // meta: { layout: 'empty' },
  },

  {
    path: "/app/registro-unidade",
    name: "RegistroUnidade",
    meta:{
      requiresAuth:true, requiresAdmin:true
    },

    component: () => import("@/views/adm/pages/UnitRegisterPage.vue"),
  },
  {
    path: "/app/registro-usuario",
    name: "RegistroUsuario",
    meta: {
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/pages/UserRegisterPage.vue")
  },
  {
    path: "/app/perfil",
    name: "Perfil",
    meta: {
      requiresAuth:true
    },
    component: () => import("@/views/pages/ProfilePage.vue"),
  },
  {
    path: "/app/avaliacoes",
    name: "Avaliacoes",
    meta: {
      requiresAuth:true
    },
    component: () => import("@/views/pages/EvaluationRegisterPage.vue"),
  },
  {
    path: "/app/indicadores",
    name: "Indicadores",
    meta: {
      requiresAuth:true, requiresAdmin:true
    },
    component: () => import("@/views/adm/pages/IndicatorRegisterPage.vue"),
  },
  {
    path: "/app/lista-usuarios",
    name: "ListaUsuarios",
    meta:{
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/pages/UsersListPage.vue"),
  },
  {
    path: "/app/lista-unidades",
    name: "ListaUnidades",
    meta: {
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/pages/UnitsListPage.vue"),
  },
  {
    path: "/app/lista-indicadores",
    name: "ListaIndicadores",
    meta:{
      requiresAuth:true,  requiresAdmin:true
    },

    component: () => import("@/views/adm/pages/IndicatorsListPage.vue"),
  },
  {
    path: "/app/lista-avaliacoes",
    name: "ListaAvaliacoes",
    meta:{
      requiresAuth:true,  requiresAdmin:true
    },
    component: () => import("@/views/adm/pages/EvaluationsListPage.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/authentication/Error.vue")
},
MainRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes,

})


router.beforeEach(routesIn);

export default router
