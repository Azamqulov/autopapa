<template>
  <div class="pa-4">
    <!-- Kategoriyalarni tanlash -->
    <v-card class="pa-4 brand-card">
      <v-tabs v-model="tab" background-color="grey-lighten-3">
        <v-tab value="popular">Популярные марки</v-tab>
        <v-tab value="all">Все</v-tab>
      </v-tabs>

      <v-window v-model="tab" class="mt-4">
        <v-window-item value="popular">
          <v-row dense>
            <v-col v-for="(brand, index) in popularBrands" :key="index" cols="6" sm="4" md="3" lg="2">
              <v-btn variant="text" class="brand-link" density="compact" @click="selectBrand(brand)">
                {{ brand }}
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>
        
        <v-window-item value="all">
          <v-row dense>
            <v-col v-for="(brand, index) in allBrands" :key="index" cols="6" sm="4" md="3" lg="2">
              <v-btn variant="text" class="brand-link" density="compact" @click="selectBrand(brand)">
                {{ brand }}
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "popular",
      popularBrands: ["BMW", "Mercedes-Benz", "Toyota", "Honda", "Audi", "Ford", "Lexus", "Tesla", "Volkswagen", "Nissan"],
      allBrands: [
        "Acura", "Alfa Romeo", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroen",
        "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar",
        "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Mazda", "McLaren", "Mercedes-Benz", "Mini",
        "Mitsubishi", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls Royce", "Subaru", "Suzuki",
        "Tesla", "Toyota", "Volkswagen", "Volvo", "Yamaha"
      ],
    };
  },
  methods: {
    selectBrand(brand) {
      alert(`Вы выбрали: ${brand}`);
    },
  },
};
</script>

<style scoped>
.brand-card {
  border-radius: 10px;
  background: #f5f5f5;
}
.brand-link {
  color: blue;
  text-transform: capitalize;
  font-weight: bold;
  min-height: 24px; 
  padding: 2px 4px; 
  margin: 1px 0; 
  font-size: 14px;
  transition: background-color 0.2s ease-in-out, color 0.2s;
}

.brand-link:hover{
  background-color: #cce5ff; /* Hover bo‘lganda och-ko‘k rang */
  color: #004085; /* Matn rangi quyuqroq ko‘rinadi */
  border-radius: 4px; 
}
</style>
