<template>
  <div class="mainLayout">
    <div class="w-full px-16 mt-2 ">
      <slot />
    </div>
  </div>
</template>
<script>
import Home from '@/views/home.vue';

export default {
  components: {
    Home
  },
  data() {
    return {

    }
  },
}
</script>
<style lang="">

</style>