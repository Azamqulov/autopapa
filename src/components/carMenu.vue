<template>
  <div class="container">
    <div class="brand-list">
      <div v-for="brand in carName" :key="brand" class="brand-item">
        <small>{{ brand }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    carName:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
}

.brand-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 20px;
  max-width: 700px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.281);
  padding: 10px;
  border-radius: 5px;
  background-color: white;
}

.brand-item small{
  border-bottom: 1px solid;
  cursor: pointer;
}
</style>
