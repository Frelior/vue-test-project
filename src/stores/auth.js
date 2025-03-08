import { ref } from "vue"
import { defineStore } from "pinia"
import { getAuth } from "firebase/auth"

export const useAuthStore = defineStore("auth", () => {
  const user = getAuth().currentUser
  const isLoggedIn = ref(user !== null)

  function storeLogIn() {
    isLoggedIn.value = true
  }

  function storeLogOut() {
    isLoggedIn.value = false
  }

  return { isLoggedIn, storeLogIn, storeLogOut }
})
