<template>
  <v-container>
    <v-row>
      <v-col v-for="(service, index) in favorites" :key="index" cols="12" md="6" lg="4">
        <v-card class="pa-3">
          <v-card-title>{{ service }}</v-card-title>
          <v-btn color="red" @click="removeFavorite(service)">
            <v-icon>mdi-heart-broken</v-icon> Olib tashlash
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    favorites: Array // Sevimlilarni prop sifatida olish
  },
  methods: {
    removeFavorite(service) {
      this.$emit("remove-favorite", service); // Ota komponentga signal berish
    }
  }
};
</script>
