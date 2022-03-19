import { createWebHistory, createRouter } from 'vue-router';

// Lazy Load pages
const Home = () => import('../components/pages/Home.vue');
const Contact = () => import('../components/pages/Contact.vue');
const Privacy = () => import('../components/pages/Privacy.vue');

const Memory = () => import('../components/pages/Memory.vue');

// const About = () => import("../components/pages/About.vue");
// const Experiments = () => import("../components/pages/Experiments.vue");
// const Futurist = () => import("../components/pages/Futurist.vue");

// const Games = () => import("../components/pages/Games.vue");
// const Simon = () => import("../components/games/Simon.vue");
// const GameOfLife = () => import("../components/games/GameOfLife.vue");

// const NotFound = () => import("../components/pages/NotFound.vue");

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
  // {
  //   path: "/:catchAll(.*)",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // if (to.hash) {
    //   return {
    //     selector: to.hash,
    //     // , offset: { x: 0, y: 10 }
    //   };
    // }

    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router;
