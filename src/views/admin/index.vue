<template>
  <div>
    <adminLayout>
      <router-view></router-view>
    </adminLayout>
  </div>
</template>
<script>
import adminLayout from './adminLayout.vue'
export default {
  components: {
    adminLayout
  }
}  
</script>
<style lang="">

</style>