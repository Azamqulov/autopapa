<template>
  <Navbar />
  <!-- ----- -->
  <div class="main_header  flex  gap-3 rounded-md text-white bg-[#003466]  py-3 px-3 ">
    <div class="search_setting_left w-100 ">
      <!------ start car list  -->
      <div class="car flex gap-2">
        <!--  -->
        <div class="car_name w-50">
          <v-select @update:model-value="getModels" v-modal="MarkaValue" clearable chips label="Марка" density="compact"
            single-line :items="CarMarka" item-title="name" item-value="id" multiple></v-select>
        </div>
        <!--  -->
        <div class="car_madel w-50">
          <v-select v-model="ModelValue" @update:model-value="PostModels" clearable chips label="Модель"
            density="compact" single-line :items="Models" item-title="name" item-value="id" multiple
            group-by="marka_id"></v-select>
        </div>
        <!--  -->
      </div>
      <!--  -->
      <div class="price flex gap-2">
        <div class="price_left w-50">
          <v-select :items="Price_to" @update:model-value="SeneOTPost" v-model="SenaOT" item-title="value"
            label="Цена от " single-line density="compact">
            <template v-slot:item="{ props: itemProps, item }">
              <v-list-item v-bind="itemProps" :subtitle="'$' + item.value"></v-list-item>
            </template>
          </v-select>
        </div>
        <!--  -->
        <div class="price_right w-50">
          <v-select :items="Price_do" @update:model-value="SeneDOPost" v-model="SenaDO" item-title="value"
            label="Цена до" single-line density="compact">
            <template v-slot:item="{ props: itemProps, item }">
              <v-list-item v-bind="itemProps" :subtitle="'$' + item.value"></v-list-item>
            </template>
          </v-select>
        </div>
      </div>
      <!--  start country-->
      <div class="country  flex gap-2 ">
        <div class="countr_left w-50">
          <v-select label="country" density="compact" @update:model-value="CountryPost" v-model="CountryValue"
            single-line :items="Country" item-title="name"></v-select>
        </div>
      </div>
      <!-- ------ start car type  -->
      <div class="  flex gap-2 ">
        <div class="countr_left w-50">
          <v-select label="Тип двигателя" @update:model-value="DivigiterPost" v-model="DivigitelValue" density="compact"
            single-line :items="tipDivigitel" item-title="tip"></v-select>
        </div>
        <div class="countr_right w-50">
          <v-select label="КПП" density="compact" @update:model-value="KPPPost" v-model="KPPValue" single-line
            :items="kpp" item-title="name"></v-select>
        </div>
      </div>
      <!-- --------- -->
      <div class="  flex gap-2 ">
        <div class="countr_left w-50">
          <v-autocomplete v-model="KuzovVal" @update:model-value="KuzovPost" density="compact" :items="kuzov"
            item-title="name" item-value="id" placeholder="Тип кузова" multiple outlined chips clearable>
            <!--  -->
            <template v-slot:item="{ props, item }">
              <v-list-item class="mt-2 border-b-md flex" v-bind="props">
                <v-img>
                  <img class="" cover :src="item.raw.img">
                </v-img>
              </v-list-item>
            </template>
          </v-autocomplete>
        </div>
        <!--  -->
        <div class="countr_right w-50">
          <v-select label="Привод" density="compact" @update:model-value="PirivitPost" v-model="PrivitVal" single-line
            :items="privod" item-title="name"></v-select>
        </div>
        <!--  -->
      </div>
      <!--  -->
      <div class="  flex gap-2 ">
        <div class="countr_left w-50">
          <div>
            <span class="text-h6">цвет</span>
            <v-menu v-model="menu" offset-y>
              <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="ml-2 px-4 rounded-lg" :style="{ backgroundColor: selectedColor !== 'any' ? selectedColor : '' }">
                <span v-if="selectedColor === 'any'">Любой</span>
                <span v-else></span>
              </v-btn>
              </template>
              <v-sheet class="pa-2 w-50 d-flex flex-wrap rounded-lg">
              <v-btn v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color.value }"
                class="ma-1 rounded-lg" width="32" height="32" @click="selectColor(color.value)"></v-btn>
              </v-sheet>
            </v-menu>
          </div>
        </div>
        <div class="countr_right w-50">
          <div class="flex gap-2">
            <v-select class="w-33" @update:model-value="obemOTPost" v-model="obemOTVal" label="Объем от"
              density="compact" single-line
              :items="[0.7, 0.8, 1.0, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.2, 2.3, 2.4, 2.5, 2.7, 2.8, 3.0, 3.2, 3.3, 3.5, 3.6]"></v-select>
            <v-select class="w-33" @update:model-value="obemDOPost" v-model="obemDOVal" label="Объем до"
              density="compact" single-line
              :items="[0.7, 0.8, 1.0, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.2, 2.3, 2.4, 2.5, 2.7, 2.8, 3.0, 3.2, 3.3, 3.5, 3.6, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 5.0, 5.5, 5.7, 6.0]"></v-select>
          </div>
        </div>
      </div>
      <!-- ----- -->
      <div class="custom  flex gap-2 ">
        <div class="flex w-100 gap-2">
          <v-select @update:model-value="ProbegOTPost" v-model="ProbegOTVal" class="w-50" label="Пробег  от"
            density="compact" single-line :items="['no', '1000', '10001', '10002', '1003', '1040']"></v-select>
          <v-select @update:model-value="ProbegDOPost" v-model="ProbegDOVal" class="w-50" label="Пробег  до"
            density="compact" single-line :items="['no', '1000', '10001', '10002', '1003', '1040']"></v-select>
        </div>
      </div>
      <!--  -->
      <div class="flex h-10 ">
        <div class="w-50 flex justify-end"><v-checkbox @update:model-value="PerformPost" v-model="PerformVal"
            :label="`выбрано`"></v-checkbox></div>
        <div class="w-50 flex justify-end"><v-checkbox @update:model-value="CarFaxPost" v-model="CarfaxVal"
            :label="`carfax`"></v-checkbox></div>
      </div>
      <!-- ----- -->
      <div class="div mt-2 mb-2  w-100">
        <v-btn class="w-full  bg-blue-darken-1">
          найдено {{ CarsNumber }} abto
        </v-btn>
      </div>
      <!-- ----- -->
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <small class="cursor-pointer" v-bind="activatorProps">Не нашли нужный автомобиль?</small>
        </template>
        <v-card prepend-icon="mdi-account" title="User Profile">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field label="имя" type="text" variant="outlined" prepend-inner-icon="mdi-account"
                  placeholder="имя"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field placeholder="+7" label="номер телефона" type="number" variant="outlined"
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
    </div>
    <div class="search_setting_right w-50">
      <SearchLest class="w-100" />
    </div>
  </div>
  <Aksiya />

</template>
<script>


import Aksiya from './aksiya.vue';
import Navbar from './navbar.vue';
import SearchLest from './searchLest.vue';
import api from '@/api';
export default {
  data() {
    return {
      CarMarka: [],
      Price_to: [],
      Price_do: [],
      Country: [],
      tipDivigitel: [],
      kpp: [],
      kuzov: [],
      privod: [],
      colors: [],
      Models: [],
      // ---------------------------------
      MarkaValue: [],
      ModelValue: [],
      SenaOT: null,
      SenaDO: null,
      CountryValue: null,
      DivigitelValue: null,
      KPPValue: null,
      KuzovVal: [],
      PrivitVal: null,
      selectedColor: 'any',
      obemOTVal: null,
      obemDOVal: null,
      ProbegOTVal: null,
      ProbegDOVal: null,
      PerformVal: false,
      CarfaxVal: false,
      ///pulls
      CarsNumber: 0,
      tab: null,
      vCardImg: [
        'https://autopapa.ge/system/credit_organizations/1/small.jpg',
        'https://autopapa.ge/system/credit_organizations/2/small.png',
        'https://autopapa.ge/system/credit_organizations/3/small.png',
        'https://autopapa.ge/system/credit_organizations/4/small.jpg',
        'https://autopapa.ge/system/credit_organizations/5/small.jpg',
        'https://autopapa.ge/system/credit_organizations/6/small.jpg',
        'https://autopapa.ge/system/credit_organizations/7/small.jpg',
        'https://autopapa.ge/system/credit_organizations/8/small.jpg'
      ],
      bodyTypes: [
        { id: 1, name: "Седан", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 2, name: "Хэтчбек 5 дв.", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 3, name: "Хэтчбек 3 дв.", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 4, name: "Лифтбек", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 5, name: "Джип 5 дв.", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 6, name: "Джип 3 дв.", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 7, name: "Универсал", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 8, name: "Минивэн", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 9, name: "Пикап", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 10, name: "Купе", image: "https://autopapa.ge/images/bodies/sedan.gif" },
        { id: 11, name: "Открытый", image: "https://autopapa.ge/images/bodies/sedan.gif" },
      ],
      menu: false,
      
      dialog: false,
      isAgreed: false,
    }
  },
  components: {
    Navbar,
    SearchLest,
    Aksiya
  },

  methods: {
    removeBodyType(type) {
      this.selectedBodyTypes = this.selectedBodyTypes.filter((item) => item.id !== type.id);
    },
    selectColor(color) {
      this.selectedColor = color;
      this.menu = false;
    },
    // post car marka
    async sendRequest() {
      try {
        const res = await api.post('/marka');
        const data = res.data.data
        console.log(data);

        // 
        this.CarMarka = data.marka
        this.Price_to = data.sena_ot
        this.Price_do = data.sena_do
        this.Country = data.country
        this.tipDivigitel = data.tip_dvigitel
        this.kpp = data.kpp
        this.kuzov = data.kuzov
        this.privod = data.privod
        this.colors = data.color
      } catch (error) {
        console.error("Xatolik:", error);
      }
    },
    // post models
    async getModels(selectedIds) {
      console.log(selectedIds);
      if (selectedIds === 0) return
      try {
        const res = await api.post('/models', { marka_id: selectedIds })
        this.Models = res.data.data
        console.log(this.Models);
      } catch (error) {
        console.log(error);
      }
      console.log(this.MarkaValue);

      try {
        const res = await api.post('/filter',
          {
            markID: selectedIds,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    // 
    async PostModels(idx) {
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: idx,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    // 
    async SeneOTPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: idx,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async SeneDOPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: idx,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async CountryPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: idx,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async DivigitelPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: idx,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async KPPPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: idx,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async KuzovPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: idx,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async DivigiterPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: idx,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async PirivitPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: idx,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async obemOTPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: idx,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async obemDOPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: idx,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async ProbegOTPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
             ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: idx,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async ProbegDOPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: idx,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async PerformPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: idx,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async CarFaxPost(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: this.selectedColor,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: idx
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
    async updateSelectedColor(idx){
      console.log(idx);
      if (idx === 0) return
      try {
        const res = await api.post('/filter',
          {
            markID: this.MarkaValue,
            modelID: this.ModelValue,
            seneOT: this.SenaOT,
            seneDo: this.SenaDO,
            CountryID: this.CountryValue,
            DivigiteID: this.DivigitelValue,
            kppID: this.KPPValue,
            kuzovID: this.KuzovVal,
            PrivitID: this.PrivitVal,
            ColorID: idx,
            obemOT: this.obemOTVal,
            obemDo: this.obemDOVal,
            ProbegDo: this.ProbegDOVal,
            ProbegOT: this.ProbegOTVal,
            PerformID: this.PerformVal,
            CarFaxID: this.CarfaxVal
          })
        this.CarsNumber = res.data.data
        console.log(this.CarsNumber);

      } catch (error) {
        console.log(error);

      }
    },
  },
  // watch: {
  //   carMarka: {
  //     handler(newValue) {
  //       if (newValue.length === 0) { 
  //         this.Models = []; // Bo'sh arrayga o'zgartiramiz
  //       }
  //     },
  //     deep: true, // Array ichidagi o‘zgarishlarni ham kuzatish
  //   },
  // },
  mounted() {
    this.sendRequest()

    console.log(window.config?.API_BASE_URL);

  }
}



</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;
}

.dropdown-btn {
  width: 100%;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: left;
  color: black;
}

.dropdown-menu {
  position: absolute;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  color: black;
}
</style>
