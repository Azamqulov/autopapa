<template>
  <div class="search">
    <Navbar />
    <v-row class="mt-10">
      <v-col cols="3">
        <FilterCar />
      </v-col>
      <v-col cols="7">
        <div class="border-b-sm mb-3">
          <v-breadcrumbs class="h-0 text-grey" :items="breadcrumbs">
            <template v-slot:item="{ item }">
              <router-link v-if="item.href" :to="item.href" class="breadcrumb-link">
                {{ item.title }}
              </router-link>
              <span v-else>{{ item.title }}</span>
            </template>
          </v-breadcrumbs>
          <!-- <h1 v-if="getSearchResults.length === 0">Ничего не найдено</h1> -->
        </div>

        
        <!-- Mashinalar ro‘yxati -->
        <SearchCar v-for="car in paginatedCars" :key="car.title" :car="car" />

        <!-- Pagination -->
        <div class="text-center">
          <v-container>
            <v-row justify="center">
              <v-col cols="8">
                <v-pagination 
                  v-model="currentPage" 
                  :length="totalPages" 
                  @update:modelValue="paginate"
                  class="my-4"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-col cols="2">
        <Recommed :carCols="12" />
      </v-col>
    </v-row>
    <Footer class="mt-6" />
  </div>
</template>

<script>
import FilterCar from "@/components/filterCar.vue";
import Navbar from "@/components/navbar.vue";
import Recommed from "@/components/recommed.vue";
import Footer from "@/components/footer.vue";
import SearchCar from "@/components/searchCar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
    FilterCar,
    Recommed,
    Footer,
    SearchCar,
  },
  data() {
    return {
      breadcrumbs: [
        { title: "Главная", disabled: false, href: "/" },
        { title: "Результаты поиска:", disabled: false, href: "" },
      ],
      
      itemsPerPage: 2,
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      if (!this.getSearchResults.data) return 0;
      return Math.ceil(this.getSearchResults.data.length / this.itemsPerPage);
    },
    paginatedCars() {
      if (!this.getSearchResults.data) return [];
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.getSearchResults.data.slice(start, start + this.itemsPerPage);
    },
    ...mapGetters("search", ["getSearchResults"]),
  },
  methods: {
    paginate(page) {
      this.currentPage = page;
    },
  },
  mounted(){
      console.log(this.getSearchResults);
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-link {
  text-decoration: none;
  position: relative;
}

.breadcrumb-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transform: scaleX(0);
  transition: transform 0.2s ease-in-out;
}

.breadcrumb-link:hover::after {
  transform: scaleX(1);
}
</style>
