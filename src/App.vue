<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router"
import { ref, onMounted, computed } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAuthStore } from "./stores/auth.js"
import { logOut } from "./services/authServices.js"

const router = useRouter()
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

let auth
onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      authStore.storeLogIn()
    } else {
      authStore.storeLogOut()
    }
  })
})

function handleLogOut() {
  logOut()
  router.push("/signin")
}
</script>

<template v-if="isLoggedIn">
  <header>
    <nav>
      <RouterLink
        to="/signin"
        v-if="!isLoggedIn"
        >Sign in</RouterLink
      >
      <RouterLink
        to="/register"
        v-if="!isLoggedIn"
        >Register</RouterLink
      >

      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/storage">Firebase Storage</RouterLink>
      <RouterLink to="/db">Firestore DB</RouterLink>
      <button
        v-if="isLoggedIn"
        @click="handleLogOut"
      >
        Log out
      </button>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
header {
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  nav {
    display: flex;
    gap: 10px;
  }
}

main {
  height: 100%;
}
</style>
