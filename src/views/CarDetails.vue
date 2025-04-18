<template>
  <!-- {{ marka }} -->
  <Navbar />
  <div class="mt-6">
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item, index }">
        <v-breadcrumbs-item class="position-relative" @mouseover="showCar(index, item)" @mouseleave="hiddenCar(index)"
          :to="item.href" :disabled="item.disabled">
          {{ item.title }}
          <i :class="item.icon"></i>

          <!-- Faqat hover bo'lgan elementda CarMenu chiqadi -->
          <CarMenu class="position-absolute  left-20" v-if="hoverStates[index]" :car-name="item.brands" />
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
  <!-- ------ -->
  <v-row>
    <v-col cols="10">
      <v-row class="align-center">
        <!-- Left Side: Images -->
        <v-col class="d-flex align-center" cols="6">
          <!--  -->
          <v-img :src="car.mainImage" class="rounded-lg w-66"></v-img>
          <!--  -->
          <v-row class=" flex  flex-column px-2 overflow-hidden h-100  ">
            <!--  -->
            <i class="fa-solid fa-caret-down fa-rotate-180 text-center w-75 mx-auto cursor-pointer text-xl bg-blue text-white "
              :class="{ 'bg-blue-grey': startImagesIndex === 0 }" @click="scrollUp()"></i>
            <!--  -->
            <v-col v-for="(img, index) in visibleImages" class="py-1" :key="index">
              <v-img :src="img" class="rounded-lg cursor-pointer " @mouseover="setMainImage(img)"></v-img>
            </v-col>
            <!--  -->
            <i class="fa-solid fa-sort-down text-center w-75 mx-auto cursor-pointer text-xl bg-blue"
              @click="scrollDown()" :class="{ 'bg-blue-grey': startImagesIndex === car.images - visibleCount }"></i>
            <!--  -->
          </v-row>
        </v-col>

        <!-- Right Side: Car Details -->
        <v-col cols="6">
          <v-card class="pa-4">
            <v-row>
              <v-col>
                <div class="flex align-center justify-between gap-2">
                  <h2 class="text-h5 font-weight-bold">{{ car.name }}</h2>
                  <span class="text-h4 font-weight-bold text-red">{{ car.price }}</span>
                  <v-btn variant="text" class="red--text text-decoration-underline">Калькулятор валют</v-btn>
                  <div class=" flex justify-end ">
                    <v-tooltip location="top center">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" :color="favorites ? 'red' : 'gray'" @click="favorites = !favorites">
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ favorites ? "Удалить из избранного" : "Добавить в избранное" }}</span>
                    </v-tooltip>
                  </div>
                </div>
                <p class="my-2">
                  <a href="#" class="text-decoration-none blue--text">Цена с растаможкой: {{ car.priceWithTax }} $</a>
                  <v-icon color="green">mdi-currency-usd</v-icon>
                </p>
                <v-btn prepend-icon="mdi-phone" color="blue-darken-2" class="text-white">
                  Звоните - {{ car.phone }}
                </v-btn>
              </v-col>
            </v-row>
            <p class="my-2">{{ car.location }}</p>
            <v-card class="mt-4 pa-2" color="blue-darken-4" dark>
              <v-row>
                <v-col>
                  <span class="font-weight-bold">VIN</span>: {{ car.vin }}
                </v-col>
              </v-row>
            </v-card>

            <v-card class="mt-4 pa-4" color="blue-grey-lighten-5">
              <v-row>
                <v-col>
                  <strong>Год выпуска:</strong> {{ car.year }} <br>
                  <strong>Тип кузова:</strong> {{ car.bodyType }} <br>
                  <strong>Состояние:</strong> {{ car.condition }} <br>
                  <strong>Тип двигателя:</strong> {{ car.driveType }} <br>
                  <strong>Мощность:</strong> {{ car.power }} <br>
                  <strong>Объём:</strong> {{ car.engineSize }}
                </v-col>
                <v-col>
                  <strong>Пробег:</strong> {{ car.mileage }} <br>
                  <strong>Привод:</strong> полный <br>
                  <strong>Двери:</strong> 4/5 <br>
                  <strong>Количество мест:</strong> 4-5 <br>
                  <strong>Цвет кузова:</strong> голубой
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
      <CarOpisan />
    </v-col>
    <!--  -->
    <v-col>
      <Recommed :car-cols="12" />
    </v-col>
  </v-row>


  <Footer class="mt-3" />
</template>

<script>
import api from "@/api";
import CarMenu from "@/components/carMenu.vue";
import CarOpisan from "@/components/carOpisan.vue";
import Footer from "@/components/footer.vue";
import Navbar from "@/components/navbar.vue";
import Recommed from "@/components/recommed.vue";

export default {
  components: {
    Navbar,
    CarMenu,
    Recommed,
    Footer,
    CarOpisan
  },
  data() {
    return {
      model: this.$route.params.model,
      items: [
        {
          title: "Главная",
          disabled: false,
          href: "/", icon: null,
          brands: []
        },
        {
          title: "Link 1",
          disabled: false,
          href: "#",
          icon: "fa-solid fa-sort-down",
          brands: ["BMW", "Audi", "Mercedes", "Nissan", "Honda", "Toyota", "Nissan",]
        },
        {
          title: "Link 2",
          disabled: false,
          href: "#",
          icon: "fa-solid fa-sort-down",
          brands: ["Toyota", "Nissan", "Honda"]
        },
        {
          title: "Link 3",
          disabled: true,
          href: "#",
          brands: []
        },
      ],
      hoverStates: [],
      car: {},
      startImagesIndex: 0,
      visibleCount: 5,
      favorites: false
    };
  },
  computed: {
    visibleImages() {
      if (!this.car.images) return [];
      return this.car.images.slice(this.startImagesIndex, this.startImagesIndex + this.visibleCount);
    },
  },
  created() {
    this.hoverStates = new Array(this.items.length).fill(false);
  },
  methods: {
    showCar(index, item) {
      if (index === 0) return;
      this.$nextTick(() => {
        this.hoverStates[index] = true;
      });
    },
    hiddenCar(index) {
      this.$nextTick(() => {
        this.hoverStates[index] = false;
      });
    },
    setMainImage(img) {
      this.car.mainImage = img;
    },
    scrollUp() {
      if (this.startImagesIndex > 0) this.startImagesIndex--;

    },
    scrollDown() {
      if (this.startImagesIndex < this.car.images.length - this.visibleCount) this.startImagesIndex++;
    },

    async getCarData() {
      console.log(this.model);

      try {
        const res = await api.post('/car', { car_id: this.model, })
        const data = res.data.data.car[0]
        this.car = data
        if (typeof data.images === 'string') {
          data.images = JSON.parse(data.images);
        }
        console.log('', this.car);
      } catch (error) {
        console.log(error);

      }
    }
  },
  mounted() {
    this.getCarData()
  }
};
</script>

<style scoped>
.v-img {
  border-radius: 8px;
}
</style>
