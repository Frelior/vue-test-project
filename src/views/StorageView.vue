<script setup>
import {
  ref as firebaseStorageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { ref } from "vue"
import { firebaseStorage } from "../main.js"

const file = ref(null)
const uploadProgress = ref(0)
const downloadURL = ref("")
const error = ref("")

function onFileSelected(e) {
  const target = e.target
  file.value = target.files?.[0]
}

async function uploadImage() {
  if (!file.value) return

  const storageRefInstance = firebaseStorageRef(
    firebaseStorage,
    `images/${file.value.name}`
  )

  const uploadTask = uploadBytesResumable(storageRefInstance, file.value)

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0)
      uploadProgress.value = progress
    },
    (err) => {
      error.value = err.message
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        downloadURL.value = url
        error.value = ""
      })
    }
  )
}
</script>

<template>
  <h1>Storage</h1>

  <input
    type="file"
    accept="image/*"
    @change="onFileSelected"
  />
  <button @click="uploadImage">Upload</button>

  <p v-if="error">{{ error }}</p>
  <div v-if="downloadURL">
    <p>
      URL: <a :href="downloadURL">{{ downloadURL }}</a>
    </p>
    <div class="uploaded-image">
      <img
        :src="downloadURL"
        alt="Uploaded image"
      />
    </div>
  </div>

  <p v-if="uploadProgress">Upload Progress: {{ uploadProgress }}%</p>
</template>

<style scoped>
a {
  border: none;
  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }
}

.uploaded-image {
  width: 300px;

  img {
    width: 100%;
  }
}
</style>
