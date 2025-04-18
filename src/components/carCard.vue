<template>
  <v-card class="px-2 py-2 text-md  ">
    <div class="relative" >
      <img  @click="$router.push({ name: 'CarDetails', params: {model:car.car_id} })" class="w-full rounded-md cursor-pointer" src="https://autopapa.ge/system/car/photos/008/437/551/thumb.jpg?1742598344"
      :alt="car.images">
      <img v-if="flag"   class="flag absolute right-0 top-0 "  :src="flag" alt="">
    </div>
    <div class="flex justify-between mt-2">
      <div>
        <p @click="$router.push({ name: 'CarDetails', params: { marka: car.marka_id, model: car.model_id } })"
          class="cursor-pointer text-lg text-blue-600">{{ car.model_name }} </p>
        <b> $ {{ car.price }}</b>
      </div>
      <v-tooltip location="top center">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" :color="favorites ? 'red' : 'gray'" @click="favorites = !favorites">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>{{ favorites ? "Удалить из избранного" : "Добавить в избранное" }}</span>
      </v-tooltip>
    </div>
    <p class="text-sm">Тбилиси,<span> не растаможен</span></p>
    <p class="text-sm"> {{ car.year }} год,<span class="ml-1"> {{ car.mileage }} км</span></p>
    <pre>
  <!-- {{ car }} -->
</pre>
  </v-card>
</template>
<script>
export default {
  props: {
    car: {
      type: Object,
      default: () => ({})
    },
    flag:String
  },
  data() {
    return {
      favorites: false,
    }
  },

}
</script>
<style lang="">

</style>