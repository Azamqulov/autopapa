<template>
    <div v-if="loading" class="text-gray-500 italic">Yuklanmoqda...</div>
  
    <ul v-else-if="history.length" class="space-y-2">
      <li v-for="(item, i) in history" :key="i" class="border-l-4 border-blue-500 pl-3 py-1">
        <div class="text-sm text-gray-800">
          {{ item.user || 'Nomaʼlum foydalanuvchi' }} <span class="text-gray-500">({{ item.timestamp }})</span>
        </div>
        <div class="text-xs text-gray-600">{{ item.action }}</div>
      </li>
    </ul>
  
    <div v-else class="text-gray-500 italic">Hali hech qanday o‘zgarishlar yo‘q.</div>
  </template>
  
  <script>
  export default {
    props: {
      carId: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        loading: true,
        history: []
      }
    },
    created() {
      this.fetchHistory()
    },
    methods: {
      async fetchHistory() {
        try {
          // 🔁 Bu yerda API chaqiruvi bo‘ladi
          // let { data } = await axios.get(`/cars/${this.carId}/history`);
          // this.history = data;
  
          // 👇 Mock data (test uchun)
          this.history = [
            {
              user: 'Admin1',
              action: 'Narxi 14000 dan 13500 ga o‘zgartirildi.',
              timestamp: '2025-04-18 10:23'
            },
            {
              user: 'Admin2',
              action: 'Rang oqdan ko‘kka o‘zgartirildi.',
              timestamp: '2025-04-17 14:09'
            },
          ]
        } catch (e) {
          console.error('Tarixni yuklashda xatolik:', e)
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  