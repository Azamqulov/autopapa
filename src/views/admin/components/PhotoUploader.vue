<template>
    <div>
      <div
        class="border-2 border-dashed rounded p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4"
        @click="triggerFileInput"
      >
        📸 Fotosuratlarni yuklash uchun shu yerga bosing
        <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleFiles" />
      </div>
  
      <div v-if="photos.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div v-for="(photo, index) in photos" :key="index" class="relative border rounded overflow-hidden">
          <img :src="photo" alt="car photo" class="w-full h-32 object-cover" />
  
          <!-- Muqova belgisi -->
          <div v-if="index === 0" class="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Muqova
          </div>
  
          <!-- Tugmalar -->
          <div class="absolute bottom-1 left-1 flex gap-1">
            <button @click="moveLeft(index)" :disabled="index === 0" class="bg-white px-2 rounded shadow">←</button>
            <button @click="moveRight(index)" :disabled="index === photos.length - 1" class="bg-white px-2 rounded shadow">→</button>
          </div>
  
          <button @click="removePhoto(index)" class="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
            ✖
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Array,
        default: () => []
      }
    },
    emits: ['update:modelValue'],
    computed: {
      photos: {
        get() {
          return this.modelValue
        },
        set(val) {
          this.$emit('update:modelValue', val)
        }
      }
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click()
      },
      handleFiles(event) {
        const files = Array.from(event.target.files)
        for (const file of files) {
          const reader = new FileReader()
          reader.onload = e => {
            this.photos = [...this.photos, e.target.result]
          }
          reader.readAsDataURL(file)
        }
      },
      removePhoto(index) {
        this.photos.splice(index, 1)
      },
      moveLeft(index) {
        if (index === 0) return
        const temp = this.photos[index - 1]
        this.photos[index - 1] = this.photos[index]
        this.photos[index] = temp
      },
      moveRight(index) {
        if (index === this.photos.length - 1) return
        const temp = this.photos[index + 1]
        this.photos[index + 1] = this.photos[index]
        this.photos[index] = temp
      }
    }
  }
  </script>
  