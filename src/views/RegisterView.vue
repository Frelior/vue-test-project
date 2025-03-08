<script setup>
import { ref } from "vue"
import {
  register,
  signInWithGoogle as google,
} from "../services/authServices.js"
import { useRouter } from "vue-router"

const router = useRouter()
const email = ref("")
const password = ref("")
const errorMessage = ref("")

async function userRegister() {
  //returns error in case of error
  const error = await register(email.value, password.value, () =>
    router.push("/")
  )
  if (error) {
    errorMessage.value = error.message
    console.log(errorMessage.value)
  }
}

function signInWithGoogle() {
  google(() => router.push("/"))
}
</script>

<template>
  <div class="auth">
    <div class="register form">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <p :if="errorMessage">{{ errorMessage }}</p>
        <button
          type="submit"
          @click.prevent="userRegister"
        >
          Register
        </button>
      </form>
    </div>
    <button @click="signInWithGoogle">Register with Google</button>
  </div>
</template>

<style scoped lang="scss"></style>
