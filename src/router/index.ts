import { createWebHistory, createRouter } from 'vue-router';
import store from '../store';

// Lazy Load pages
const Home = () => import('../components/Home.vue');
const Contact = () => import('../components/Contact.vue');
const Privacy = () => import('../components/Privacy.vue');

const Login = () => import('../components/Login.vue');
const Register = () => import('../components/Register.vue');
const ForgotPassword = () => import('../components/ForgotPassword.vue');

const Profile = () => import('../components/Profile.vue');
const Shop = () => import('../components/Shop.vue');

const Memory = () => import('../components/Memory.vue');

// const About = () => import("../components/pages/About.vue");
// const Experiments = () => import("../components/pages/Experiments.vue");
// const Futurist = () => import("../components/pages/Futurist.vue");

// const Games = () => import("../components/pages/Games.vue");
// const Simon = () => import("../components/games/Simon.vue");
// const GameOfLife = () => import("../components/games/GameOfLife.vue");

const NotFound = () => import('../components/NotFound.vue');

const requiresAuth = {
  requiresAuth: true,
};

const redirectAuth = {
  redirectAuth: true,
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: requiresAuth,
    component: Profile,
  },
  {
    path: '/shop',
    name: 'Shop',
    // meta: requiresAuth,
    component: Shop,
  },
  {
    path: '/games/memory',
    name: 'Memory',
    component: Memory,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: About,
  // },
  // {
  //   path: "/experiments",
  //   name: "Experiments",
  //   component: Experiments,
  // },
  // {
  //   path: "/futurist",
  //   name: "Futurist",
  //   component: Futurist,
  // },
  // {
  //   path: "/games",
  //   name: "Games",
  //   component: Games,
  //   children: [
  //     {
  //       path: 'simon',
  //       component: Simon,
  //     },
  //     {
  //       path: 'gameoflife',
  //       component: GameOfLife,
  //     },
  //   ],
  // },
  // // {
  // //   path: '/games/simon',
  // //   component: Simon,
  // // },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

// https://next.router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) next('/login');
  else if (to.meta.redirectAuth && store.getters.isAuthenticated) next('/');
  else next();
});

export default router;
