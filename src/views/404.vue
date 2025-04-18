<template>
  <div>
    <Navbar/>
  </div>

  <h1 class="text-center text-8xl mt-10" >404</h1>
  <div class="four_zero_four_bg"></div>
  <v-btn  @click="$router.push('/')" style="background-color: #00c039;" class="d-flex mx-auto  text-white">
    go to home
  </v-btn>
</template>
<script>
import Navbar from '@/components/navbar.vue';

export default {
  components:{
    Navbar
  }
}
</script>
<style  scoped>




.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 350px;
  background-position: center;
}



</style>