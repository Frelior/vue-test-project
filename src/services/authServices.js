import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { useAuthStore } from "../stores/auth"

export async function register(email, password, redirectFunction = null) {
  const authStore = useAuthStore()
  try {
    await createUserWithEmailAndPassword(getAuth(), email, password)
    console.log("User registered")
    redirectFunction && redirectFunction()
    authStore.logIn()
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function logIn(email, password, redirectFunction = null) {
  const authStore = useAuthStore()
  try {
    await signInWithEmailAndPassword(getAuth(), email, password)
    console.log("Logged in")
    redirectFunction && redirectFunction()
    authStore.logIn()
  } catch (error) {
    console.log(error)
    return error
  }
}

export function signInWithGoogle(redirectFunction = null) {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: "select_account" })
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result)
      redirectFunction && redirectFunction()
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function logOut(redirectFunction = null) {
  const authStore = useAuthStore()
  try {
    await signOut(getAuth())
    redirectFunction && redirectFunction()
    authStore.logOut()
  } catch (error) {
    console.log(error)
    return error
  }
}
