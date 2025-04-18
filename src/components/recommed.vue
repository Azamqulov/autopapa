<template>
  <div class="recommed bg-[#ecf6ff] px-2 py-2 rounded-md">
    <h1 class="text-xl mb-2">Рекомендуем</h1>
    <v-row>
      <v-col :cols="carCols" cols="12" v-for="car in RecCards" >
        <CarCard :flag="flagImage" :car="car" class="bg-transparent" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CarCard from './carCard.vue';
import api from '@/api.js'; 
export default {
  data() {
    return {
      flagImage:'https://autopapa.ge/system/flags/2.jpg',
      RecCards: [],
    }
  },
  components: {
    CarCard
  },
  props:{
    carCols:{
      type:Number,
      default:6
    }
  },
 methods:{
  async getRec(){
    try {
      const res = await api.post('/car_rec');
      this.RecCards = res.data.data.car;
      console.log(this.RecCards);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  },
 },
  mounted() {
    this.getRec();
  }
}
</script>
<style lang="">

</style>