<template>
  <div class="header_page flex align-center mb-5 justify-space-between mt-4">
    <div class="logo" @click="$router.push('/')">
      <img style="max-width: 250px;"  class=" cursor-pointer" src="../../public/images/logo/logo.jpg" alt="">
    </div>
    <!-- logo end -->
     <div >
    <div>
    <v-row  class="gap-10 text-sm justify-between"  >
      <v-col cols="auto" class="d-flex gap-3 align-center">
        <div class="tracking-wider">
          <v-icon>mdi-clock-outline</v-icon>
        <span class="ml-2">Ежедневно с 9:00 до 21:00</span>
        </div>
        <div class="tracking-wider">
          <v-icon class="ml-4">mdi-map-marker-outline</v-icon>
        <span class="ml-2">г. Красноярск, пр-т. Металлургов, 2р</span>
        </div>
        <div class="tracking-wider">
          <v-icon class="ml-4">mdi-phone</v-icon>
        <span class="ml-2">+7 (391) 2287400</span>
        </div>
      </v-col>
      <!--  -->
      <v-col cols="auto" class="d-flex align-center">
        <a href="#" class="text-decoration-none text-black font-weight-medium">Регистрация</a>
        <span class="mx-2">|</span>
        <p class="text-decoration-none text-black font-weight-medium" @click="$router.push({name:'login'})" >Вход</p>
        <span class="mx-2">|</span>
        <v-icon>mdi-help-circle-outline</v-icon>
        <a href="#" class="text-decoration-none text-black font-weight-medium ml-2">Поддержка</a>
      </v-col>
    </v-row>
  </div>

  </div>
  </div>
 <div class="flex justify-end">
  <div class="flex  align-center gap-2  ">
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <small class="cursor-pointer" v-bind="activatorProps">
            <v-btn :href="'tel:+998901234567'">📞 Call Me</v-btn>
          </small>
        </template>
        <v-card prepend-icon="mdi-account" title="User Profile">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field  label="имя" type="text" variant="outlined"
                  prepend-inner-icon="mdi-account" placeholder="имя"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field placeholder="+7"  label="номер телефона" type="number" variant="outlined"
                  prepend-inner-icon="mdi-phone"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <small>
            <v-checkbox v-model="isAgreed" class="ml-2"
              label="Я согласен на обработку персональных данных"></v-checkbox>
          </small>

          <v-card-actions>
            <v-btn :disabled="!isAgreed" class="bg-blue-accent-4 w-100 text-white" @click="dialog = false">
              Отправить запрос
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn>
        избранное
        <v-icon color="red">mdi-heart</v-icon>
      </v-btn>
      <!--  -->
      <v-btn style="background-color:#00c039;">
        <img style="max-width: 200px; height: auto;" src="https://autopapa.ge/system/content/CarFax/btn_carfax_ru.png" alt="">
      </v-btn>
      <!--  -->
      <div class="searBar ">
        <searBar />
      </div>
    </div>
 </div>
</template>
<script>
import searBar from './searBar.vue';
export default {
  data() {
    return {
      selectCountry: 'florida',
      dialog: false,
      isAgreed: false
    }
  },
  components: {
    searBar
  }
}
</script>
<style lang="">

</style>