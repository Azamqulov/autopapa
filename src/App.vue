<template>
  <MainLayout>
    <router-view>

    </router-view>
  </MainLayout>
</template>
<script>
import MainLayout from './layouts/mainLayout.vue';
export default {
  data() {
    return {
      array: []
    }
  },
  components: {
    MainLayout
  },

}
</script>
<style lang="scss"></style>