<template>
  <div>
    <!-- Sarlavha va Yaratish tugmasi -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">🚗 Avtomobil Ombori</h1>
      <button @click="openCreateModal" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + Yangi mashina
      </button>
    </div>

    <!-- Qidiruv va Filtrlar -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <input
        v-model="search"
        placeholder="Model bo‘yicha qidirish..."
        class="border p-2 rounded w-full md:w-1/2"
      />
      <select v-model="filter" class="border p-2 rounded w-full md:w-1/4">
        <option value="">Barchasi</option>
        <option value="white">Oq fonda</option>
        <option value="blue">Ko‘k fonda</option>
      </select>
    </div>

    <!-- Avtomobillar jadvali -->
    <div class="overflow-x-auto border rounded">
      <table class="w-full text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 border-b">Rasm</th>
            <th class="px-4 py-2 border-b">Model</th>
            <th class="px-4 py-2 border-b">Yil</th>
            <th class="px-4 py-2 border-b">Narx</th>
            <th class="px-4 py-2 border-b">Foni</th>
            <th class="px-4 py-2 border-b">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="car in filteredCars"
            :key="car.id"
            class="hover:bg-gray-50"
            @dblclick="editCar(car.id)"
          >
            <td class="px-4 py-2 border-b">
              <img :src="car.cover" class="w-20 h-12 object-cover rounded shadow" />
            </td>
            <td class="px-4 py-2 border-b">{{ car.model }}</td>
            <td class="px-4 py-2 border-b">{{ car.year }}</td>
            <td class="px-4 py-2 border-b">{{ car.price }} so‘m</td>
            <td class="px-4 py-2 border-b capitalize">{{ car.background }}</td>
            <td class="px-4 py-2 border-b">
              <button @click.stop="editCar(car.id)" class="text-blue-600 hover:underline">✏️</button>
              <button @click.stop="deleteCar(car.id)" class="text-red-600 ml-3 hover:underline">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!filteredCars.length" class="p-4 text-center text-gray-500 italic">Hech narsa topilmadi.</div>
    </div>

    <!-- Modal: Yaratish / Tahrirlash -->
    <CarForm v-if="showModal" :car-id="selectedCarId" @close="closeModal" />
  </div>
</template>

<script>
import CarForm from './CarForm.vue'

export default {
  components: { CarForm },
  data() {
    return {
      cars: [],
      search: '',
      filter: '',
      showModal: false,
      selectedCarId: null,
    }
  },
  computed: {
    filteredCars() {
      return this.cars
        .filter(car => !this.filter || car.background === this.filter)
        .filter(car => car.model.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  created() {
    this.fetchCars()
  },
  methods: {
    fetchCars() {
      // 🔁 API dan mashinalarni olish (mock)
      this.cars = [
        {
          id: 1,
          model: 'Spark',
          year: 2023,
          price: 9000,
          background: 'white',
          cover: '/images/spark.jpg',
        },
        {
          id: 2,
          model: 'Malibu',
          year: 2021,
          price: 20000,
          background: 'blue',
          cover: '/images/malibu.jpg',
        },
      ]
    },
    openCreateModal() {
      this.selectedCarId = null
      this.showModal = true
    },
    editCar(id) {
      this.selectedCarId = id
      this.showModal = true
    },
    deleteCar(id) {
      if (confirm('Rostdan ham o‘chirmoqchimisiz?')) {
        this.cars = this.cars.filter(car => car.id !== id)
      }
    },
    closeModal() {
      this.showModal = false
      this.selectedCarId = null
      this.fetchCars()
    },
  },
}
</script>
