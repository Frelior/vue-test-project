import "./assets/main.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import App from "./App.vue"
import router from "./router"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "test-project-rudenko.firebaseapp.com",
  projectId: "test-project-rudenko",
  storageBucket: "test-project-rudenko.firebasestorage.app",
  messagingSenderId: "900827388211",
  appId: "1:900827388211:web:fa8c4b5b497eba34cf4646",
}

const firebase = initializeApp(firebaseConfig)
const app = createApp(App)
export const db = getFirestore(firebase)
export const firebaseStorage = getStorage(firebase)

app.use(createPinia())
app.use(router)

app.mount("#app")
