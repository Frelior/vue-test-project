import { reactive } from "vue"
import { defineStore } from "pinia"

export const useMessagesStore = defineStore("messages", () => {
  const messages = reactive([])

  // this two functions just in case i need to update local store
  function addMessageStore(message) {
    if (Array.isArray(message)) {
      message.forEach((item) => {
        messages.push(item)
      })
    } else {
      messages.push(message)
    }
  }
  function deleteMessageStore(id) {
    const index = messages.findIndex((item) => item.id === id)
    messages.splice(index, 1)
  }

  return { messages, deleteMessageStore, addMessageStore }
})
