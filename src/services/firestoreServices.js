import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../main.js"
import { useMessagesStore } from "../stores/messages.js"

export async function pushNewMessage(message) {
  try {
    const docRef = await addDoc(collection(db, "messages"), { message })
    console.log("Document written with ID: ", docRef.id)
    getMessages() // update store
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export async function deleteMessageById(id) {
  try {
    await deleteDoc(doc(db, "messages", id))
    console.log(`Document ID: ${id} deleted`)

    getMessages()
  } catch (e) {
    console.error("Error deleting document: ", e)
  }
}

export async function getMessages() {
  const messagesStore = useMessagesStore()
  const querySnapshot = await getDocs(collection(db, "messages"))
  const messages = []

  // adding ID key to each message
  querySnapshot.forEach((doc) => {
    const newMessageObject = doc.data()
    newMessageObject.id = doc.id
    messages.push(newMessageObject)
  })

  messagesStore.messages = messages // update store
}
