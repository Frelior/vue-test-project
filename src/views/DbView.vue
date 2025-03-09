<script setup>
import { onMounted, ref, computed } from "vue"
import {
  pushNewMessage,
  getMessages,
  deleteMessageById,
} from "../services/firestoreServices.js"
import { useMessagesStore } from "../stores/messages.js"

const messagesStore = useMessagesStore()
const message = ref("")
const messages = computed(() => messagesStore.messages)

onMounted(() => {
  getMessages().then(() => console.log(messages))
})
</script>

<template>
  <div>
    <h1>Firestore Database</h1>

    <div class="message-input">
      <input
        type="text"
        placeholder="input new message"
        v-model="message"
      />
      <button @click="pushNewMessage(message)">Add Message</button>
    </div>

    <div
      v-for="msg in messages"
      class="msg"
    >
      <div class="content">
        <p>ID:{{ msg.id }}</p>
        <p>Message: {{ msg.message }}</p>
      </div>
      <button @click="deleteMessageById(msg.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.message-input {
  display: flex;
}
.msg {
  margin: 10px;
  border-bottom: 1px dashed wheat;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
