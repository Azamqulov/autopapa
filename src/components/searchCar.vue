<template>
  <v-card class="car-card d-flex mt-3">
    <!-- Rasm -->
    <div class="w-33">
      <v-img :src="car.mainImage" class="car-image " ></v-img>
    </div>

    <!-- Ma'lumotlar -->
    <v-card-text class="car-details">
      <h3>
        <a href="#" class="car-title">{{ car.model_name }}</a>
      </h3>
      <p class="car-price">
        <span class="red--text font-weight-bold">{{ car.price }}</span> ₾
      </p>
      <p class="car-info">
        {{ car.year }} год, {{ car.location }}, {{ car.condition }},
        тел. {{ car.phone }}
      </p>

      <!-- Texnik xususiyatlar -->
      <div class="car-specs d-flex">
        <div class="d-flex align-center mr-4">
          <v-icon class="mr-1">mdi-road</v-icon>
          <span>{{ car.mileage }} км / {{ car.mileage }} Миль</span>
        </div>
        <div class="d-flex align-center mr-4">
          <v-icon class="mr-1">mdi-gas-station</v-icon>
          <span>{{ car.engineSize }}</span>
        </div>
        <div class="d-flex align-center">
          <v-icon class="mr-1">mdi-steering</v-icon>
          <span>{{ car.driveType }}</span>
        </div>
      </div>

      <!-- Избранные -->
      <div class="mt-8 flex justify-end ">
        <v-tooltip location="top center">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :color="favorites ? 'red' : 'gray'" @click="favorites = !favorites">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>{{ favorites ? "Удалить из избранного" : "Добавить в избранное" }}</span>
        </v-tooltip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>


export default {
  props: {
    car: Object,
  },
  data() {
    return {
      favorites: false,
    }
  },
}
</script>

<style scoped>
.car-card {
  display: flex;
  padding: 10px;
}

.car-image {
  height: auto;
  border-radius: 8px !important;
}

.car-details {
  margin-left: 15px;
}

.car-title {
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: blue;
}

.car-price {
  font-size: 22px;
}

.car-info {
  color: #555;
}

.car-specs {
  margin-top: 10px;
  font-size: 14px;
}

.favorite-text {
  text-decoration: underline;
  cursor: pointer;
  color: gray;
}
</style>
