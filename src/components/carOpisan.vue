<template>
  <v-container class="mt-3">
    <v-tabs v-model="tab">
      <v-tab value="description">Описание авто</v-tab>
      <v-tab value="delivery">Доставка и растаможка</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!--  -->
      <v-window-item value="description">
        <v-card class="pa-5">Описание автомобиля</v-card>
      </v-window-item>
      <!--  -->
      <v-window-item value="delivery">
        <v-card class="pa-5">
          <h3 class="text-h5 font-weight-bold">Расчет доставки и растаможки автомобиля</h3>
          <v-select class="w-33" v-model="selectedCountry" :items="countries"
            label="Выберите страну доставки"></v-select>
          <!--  -->
          <div>
            <v-table class="border-sm">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="item in 4">

                    <CarCard class="mb-2" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="header">цена в Грузии</td>
                  <td v-for="(car, index) in cars" :key="index">{{ car.price }}</td>
                </tr>
                <tr>
                  <td class="header">Услуга “Сопровождение клиента”</td>
                  <td v-for="(car, index) in cars" :key="index">$200</td>
                </tr>
                <tr>
                  <td class="header">Оформление экспортных документов</td>
                  <td v-for="(car, index) in cars" :key="index">$100</td>
                </tr>
                <tr>
                  <td class="header">Расход на топливо до Баку (ориентир.)</td>
                  <td v-for="(car, index) in cars" :key="index">$45</td>
                </tr>
                <tr>
                  <td class="header">Таможенное оформление (ориентир.)</td>
                  <td v-for="(car, index) in cars" :key="index" class="blue--text">{{ car.customs }}</td>
                </tr>
                <tr>
                  <td class="header bold">Итоговая цена с учётом растаможки</td>
                  <td v-for="(car, index) in cars" :key="index" class="font-weight-bold">{{ car.finalPrice }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <v-btn color="red" block class="mt-10">Перезвоните мне</v-btn>
        </v-card>
      </v-window-item>
      <!--  -->
    </v-window>
  </v-container>
</template>

<script>
import CarCard from './carCard.vue';

export default {
  components: {
    CarCard
  },
  data() {
    return {
      tab: "delivery",
      selectedCountry: "Грузия",
      countries: ["Грузия", "Россия", "Казахстан"],
      cars: [
        { image: "car1.jpg", name: "Volkswagen Tiguan", price: "$20,500", customs: "$7,067", finalPrice: "$27,912" },
        { image: "car2.jpg", name: "Volkswagen Touareg", price: "$8,000", customs: "$15,945", finalPrice: "$24,290" },
        { image: "car3.jpg", name: "Ford Edge", price: "$9,100", customs: "$15,097", finalPrice: "$24,542" },
        { image: "car4.jpg", name: "Honda CR-V", price: "$22,500", customs: "$5,730", finalPrice: "$28,575" },
      ],
      headers: [
        { text: 'Model', value: 'model' },
        { text: 'Yil', value: 'year' },
        { text: 'Narx (Gruzya)', value: 'price' },
        { text: 'Xizmat', value: 'service' },
        { text: 'Hujjatlar', value: 'documents' },
        { text: 'Yo‘l harajati', value: 'fuel' },
        { text: 'Bojxona narxi', value: 'priceCustoms' },
        { text: 'Umumiy narx', value: 'totalPrice' }
      ]
    };
  },
};
</script>

<style>
.v-container {
  max-width: 1200px;
}

.v-simple-table {
  margin-top: 20px;
}

th,
td {
  text-align: center;
  padding: 10px;
  border-right: 1px solid #ddd;
}

.blue--text {
  color: blue;
}

.font-weight-bold {
  font-weight: bold;
}

.header {
  background-color: #f5f5f5;
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
}

.bold {
  font-size: 1.1em;
}
</style>
