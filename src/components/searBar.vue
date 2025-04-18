<template>
  <div class="sear_bar   ">
    <div class=" d-flex align-center px-2 w-full">
      <v-card-text>
        <v-text-field @update:model-value="searchQuery" min-width="200px" :loading="loading" append-inner-icon="mdi-magnify" density="compact"
          label="Search templates" variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
      </v-card-text>
      <v-btn @click="onClick" class="bg-blue-darken-1">
        search
      </v-btn>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import api from '@/api'
import { useStore } from 'vuex'
import router from '@/router'
const loaded = ref(false)
const loading = ref(false)
const store = useStore()
// import { useRouter } from 'vue-router'
function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
  router.push({name:'search'})
}

async function searchQuery(value) {
  console.log(value)
  router.push({name:'search'})
  try {
    if(value === ''){
      store.commit('search/setSearchResults', [])
      return
    }
    if (!value) return 
  
    const res = await api.post('/search_string', { search_string: value })
   store.commit('search/setSearchResults', res.data)
    console.log(res.data)
  } catch (error) {
    console.error('Error fetching search results:', error)
  }
}
</script>
<style lang="">

</style>