<template>
    <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white p-6 w-full max-w-4xl rounded-lg overflow-y-auto max-h-[90vh]">
        <h2 class="text-xl font-semibold mb-4">
          {{ carId ? 'Mashina ma\'lumotini tahrirlash' : 'Yangi mashina qo\'shish' }}
        </h2>
  
        <!-- 1. Asosiy ma'lumotlar -->
        <section class="mb-4 grid grid-cols-2 gap-4">
          <input v-model="car.model" placeholder="Model" class="border p-2 rounded" />
          <input v-model="car.year" type="number" placeholder="Yil" class="border p-2 rounded" />
          <input v-model="car.price" type="number" placeholder="Narx (so‘m)" class="border p-2 rounded" />
          <select v-model="car.background" class="border p-2 rounded">
            <option disabled value="">Fonni tanlang</option>
            <option value="white">Oq fonda</option>
            <option value="blue">Ko‘k fonda</option>
          </select>
        </section>
  
        <!-- 2. Yuklash | Holat -->
        <section class="mb-4">
          <h3 class="font-bold mb-2">Yuklash | Holat</h3>
          <div class="flex gap-4">
            <label><input type="checkbox" v-model="car.export.autoRu" /> Auto.ru</label>
            <label><input type="checkbox" v-model="car.export.avitoRu" /> Avito.ru</label>
            <label><input type="checkbox" v-model="car.export.dromRu" disabled /> Drom.ru (keyin)</label>
          </div>
        </section>
  
        <!-- 3. PTS / STS -->
        <section class="mb-4">
          <h3 class="font-bold mb-2">PTS / STS</h3>
          <textarea v-model="car.pts" placeholder="PTS / STS ma'lumotlari" class="border p-2 rounded w-full"></textarea>
        </section>
  
        <!-- 4. Tavsif -->
        <section class="mb-4">
          <h3 class="font-bold mb-2">Tavsif</h3>
          <textarea v-model="car.description" placeholder="Mashina haqida qisqacha ma'lumot" class="border p-2 rounded w-full"></textarea>
        </section>
  
        <!-- 5. Fotosuratlar -->
        <section class="mb-4">
          <h3 class="font-bold mb-2">Fotosuratlar</h3>
          <photo-uploader v-model="car.photos" />
        </section>
  
        <!-- 6. O‘zgarishlar tarixi -->
        <section class="mb-4">
          <h3 class="font-bold mb-2">O‘zgarishlar tarixi</h3>
          <history-log :car-id="carId" />
        </section>
  
        <!-- Tugmalar -->
        <div class="flex justify-end gap-4">
          <button @click="$emit('close')" class="px-4 py-2 border rounded">Bekor qilish</button>
          <button @click="submitForm" class="px-4 py-2 bg-green-600 text-white rounded">
            Saqlash
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PhotoUploader from './components/PhotoUploader.vue'
  import HistoryLog from './components/HistoryLog.vue'
  
  export default {
    props: {
      carId: {
        type: [String, Number],
        default: null
      }
    },
    components: {
      PhotoUploader,
      HistoryLog
    },
    data() {
      return {
        car: {
          model: '',
          year: '',
          price: '',
          background: '',
          export: {
            autoRu: false,
            avitoRu: false,
            dromRu: false
          },
          pts: '',
          description: '',
          photos: []
        }
      }
    },
    created() {
      if (this.carId) {
        this.loadCar()
      }
    },
    methods: {
      loadCar() {
        // 🔁 API dan mashina ma'lumotlarini olish (mock)
        this.car = {
          model: 'Lacetti',
          year: 2022,
          price: 14000,
          background: 'white',
          export: {
            autoRu: true,
            avitoRu: false,
            dromRu: false
          },
          pts: 'PTS 01A123456',
          description: 'Yaxshi holatda, 1-xo‘jayin.',
          photos: ['/photo1.jpg', '/photo2.jpg']
        }
      },
      submitForm() {
        if (this.carId) {
          // PUT update
          console.log('Updating car:', this.car)
        } else {
          // POST new car
          console.log('Creating new car:', this.car)
        }
        this.$emit('close')
      }
    }
  }
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  