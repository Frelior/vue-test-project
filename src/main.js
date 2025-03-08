import "./assets/main.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { initializeApp } from "firebase/app"
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

initializeApp(firebaseConfig)
const app = createApp(App)



app.use(createPinia())
app.use(router)

app.mount("#app")
