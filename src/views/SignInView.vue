<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
import { logIn, signInWithGoogle as google } from "../services/authServices.js"

const router = useRouter()
const email = ref("")
const password = ref("")
const errorMessage = ref("")

async function signIn() {
  //returns error in case of error
  const error = await logIn(email.value, password.value, () => router.push("/"))
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
      <h1>Sign In</h1>
      <form action="">
        <input
          type="email"
          autocomplete="email"
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
          @click.prevent="signIn"
        >
          Sign In
        </button>
      </form>
    </div>
    <button @click="signInWithGoogle">Sign In with Google</button>
  </div>
</template>

<style scoped lang="scss"></style>
