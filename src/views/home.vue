<template>
  <div class="home_page">
    <Header />
    <v-row class="mt-5">
      <v-col cols="12" lg="8" md="8" sm="12">
        <!--  -->
        <v-row class="border-b-1">
          <v-col>
            <h1>Новые предложения</h1>
          </v-col>
          <v-col cols="auto flex gap-3 align-center">
            <small>
              <a href="#" class="card_link">на авторынке
              </a> 6717
            </small>
            |
            <small>
              <a href="#" class="card_link"> за час
              </a> 7
            </small>
            |
            <small>
              <a href="#" class="card_link"> за 3 дня
              </a>451
            </small>
            |
            <small>
              <a href="#" class="card_link"> за неделю
              </a> 1068
            </small>
            |
            <small>
              <a href="#" class="card_link"> за неделю
              </a> 1068
            </small>
          </v-col>
        </v-row>
        <v-row>
          <!--  -->
          <v-col class="gap-2" cols="12" md="3" sm="6" v-for="card in newCars">
            <CarCard elevation="6" :car="card" />
            <!--  -->
          </v-col>
          <!--  -->
        </v-row>
        <!--  -->
      </v-col>
      <!--  -->
      <v-col>
        <v-row>
          <v-col>
            <Recommed />
          </v-col>
        </v-row>
      </v-col>
      <!--  -->
    </v-row>
    <CarMarka />
    <Footer />
  </div>
</template>
<script>
import CarCard from '@/components/carCard.vue';
import CarMarka from '@/components/carMarka.vue';
import Header from '@/components/header.vue';
import Recommed from '@/components/recommed.vue';
import Footer from '@/components/footer.vue';
import api from '@/api';
export default {
  components: {
    Header,
    CarCard,
    Recommed,
    CarMarka,
    Footer
  },
  data() {
    return {
      newCars: []
    }
  },
  methods: {
    async getCarNew() {
      try {
        const res = await api.post('/car_new')
        const data = res.data.data.car
        this.newCars = data
        console.log(this.newCars);

      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getCarNew()
  }
}
</script>
<style lang="scss" scoped>
.card_link {
  border-bottom: 1px solid rgba(0, 0, 255, 0.619);
  color: rgba(0, 0, 255, 0.548);
}

.card_link:hover {
  color: blue;
  border-color: blue;
}
</style>