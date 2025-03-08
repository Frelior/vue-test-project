import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/storage",
      name: "storage",
      component: () => import("../views/StorageView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/db",
      name: "db",
      component: () => import("../views/DbView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SignInView.vue"),
    },
  ],
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert("You are not logged in")
      next("/signin")
    }
  } else {
    next()
  }
})

export default router
