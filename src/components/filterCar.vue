<template>
  <div class="search_setting_left bg-blue-100 px-4 py-2 rounded-md w-100 ">
    <label>Автобизнес</label>
    <v-combobox density="compact" label="Combobox"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-combobox>

    <div>
      <label for="">Стоимость</label>
      <div class="price flex gap-2">
        <div class="price_left w-50">
          <v-select :items="items" item-title="name" label="price" single-line density="compact">
            <template v-slot:item="{ props: itemProps, item }">
              <v-list-item v-bind="itemProps" :subtitle="'$' + item.value"></v-list-item>
            </template>
          </v-select>
        </div>
        <div class="price_right w-50">
          <v-select :items="items" item-title="name" label="price" single-line density="compact">
            <template v-slot:item="{ props: itemProps, item }">
              <v-list-item v-bind="itemProps" :subtitle="'$' + item.value"></v-list-item>
            </template>
          </v-select>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="car_type  flex gap-2">
      <div class="countr_left w-50">
        <h1>Марка</h1>
        <v-select label="country" density="compact" single-line persistent-hint
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      </div>
      <div class="countr_right w-50">
        <h1>Модель</h1>
        <v-select label="Select" density="compact" single-line
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      </div>
    </div>
    <!--  -->
    <div>
      <h1>Новые объявления</h1>
      <v-select label="country" density="compact" single-line persistent-hint
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
    </div>
    <!--  ------->
    <div class="flex justify-space-between">
      <h1>Год</h1>
      <div class="flex w-75 gap-4">
        <v-select class="w-50" label="ot" density="compact" single-line persistent-hint
          :items="['2000', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        <v-select class="w-50" label="do" density="compact" single-line persistent-hint
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      </div>
    </div>
    <!--  -->
    <div class="flex justify-space-between">
      <h1>Пробег</h1>
      <div class="flex w-75 h-10 gap-4">
        <v-select class="w-50" label="ot" density="compact" single-line persistent-hint
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        <v-select class="w-50" label="do" density="compact" single-line persistent-hint
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      </div>
    </div>
    <!--  -->
    <div class=" flex">
      <div class="w-50 flex leading-tight h-10"><v-checkbox :label="`выбрано`"></v-checkbox></div>
      <div class="w-50 flex "><v-checkbox :label="`carfax`"></v-checkbox></div>
    </div>
    <!--  -->


    <div class=" p-4">
      <h2 class="font-bold mb-2">
        Тип кузова <span class="font-normal text-sm">(внедорожник, пикап)</span>
      </h2>
      <div class="grid grid-cols-2 gap-x-8 gap-y-1">
        <label v-for="(type, index) in types" :key="index" class="flex gap-2 items-center space-x-2">
          <input type="checkbox" v-model="selectedTypes" :value="type" class="w-4 h-4" />
          <span class="text-sm">{{ type }}</span>
        </label>
      </div>
    </div>

    <div class="mt-4">
      <h1 class="font-bold">Местонахождение</h1>
      <div class="car_type mt-2  flex gap-2">
        <div class="countr_left w-50">
          <h1>Страна</h1>
          <v-select label="country" density="compact" single-line persistent-hint
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        </div>
        <div class="countr_right w-50">
          <h1>Город</h1>
          <v-select label="Select" density="compact" single-line
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        </div>
      </div>
    </div>
    <div class=" flex h-14">
      <div class="w-50 flex leading-tight h-10"><v-checkbox :label="`выбрано`"></v-checkbox></div>
      <div class="w-50 flex "><v-checkbox :label="`carfax`"></v-checkbox></div>
    </div>

    <div class="">
      <div class="countr_left w-100">
        <h1>Состояние</h1>
        <v-select label="---" density="compact" single-line persistent-hint
          :items="['----', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      </div>
    </div>
    <!--  -->
    <div class="mb-3 border-b-1">
      <h1 class="cursor-pointer" @click="showTechnical">
        <i class="fa-solid fa-caret-down" :class="{ 'fa-rotate-270': !showTech }"></i>
        Технические характеристики
      </h1>
    </div>
    <!-- ----------------  show tecnical -->
    <div v-if="showTech">
      <div class=" p-4">
        <h2 class="font-bold mb-2">
          Тип кузова <span class="font-normal text-sm">(внедорожник, пикап)</span>
        </h2>
        <div class="grid grid-cols-2 gap-x-8 gap-y-1">
          <label v-for="(type, index) in types" :key="index" class="flex gap-2 items-center space-x-2">
            <input type="checkbox" v-model="selectedTypes" :value="type" class="w-4 h-4" />
            <span class="text-sm">{{ type }}</span>
          </label>
        </div>
      </div>
      <!--  -->
      <div class="flex justify-space-between mt-3">
        <h1>Год</h1>
        <div class="flex w-75 gap-4">
          <v-select class="w-50" label="ot" density="compact" single-line persistent-hint
            :items="['2000', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
          <v-select class="w-50" label="do" density="compact" single-line persistent-hint
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        </div>
      </div>
      <!--  -->
      <div class="flex justify-space-between">
        <h1>Пробег</h1>
        <div class="flex w-75 h-10 gap-4">
          <v-select class="w-50" label="ot" density="compact" single-line persistent-hint
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
          <v-select class="w-50" label="do" density="compact" single-line persistent-hint
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
        </div>
      </div>
      <!--  -->
      <div>
        <h1 class="font-bold">Kоробка передач</h1>
        <div class=" flex">
          <div class="w-50 flex leading-tight h-10"><v-checkbox :label="`выбрано`"></v-checkbox></div>
          <div class="w-50 flex "><v-checkbox :label="`carfax`"></v-checkbox></div>
        </div>
      </div>
      <!--  -->
      <div>
        <h1 class="font-bold">Kоробка передач</h1>
        <div class=" flex">
          <div class="w-50 flex flex-column leading-tight h-10">
            <v-checkbox class="h-8" :label="`выбрано`"></v-checkbox>
            <v-checkbox :label="`выбрано`"></v-checkbox>
          </div>
          <div class="w-50 flex "><v-checkbox :label="`carfax`"></v-checkbox></div>
        </div>
      </div>
      <!--  -->
      <div>
        <h1 class="font-bold mt-4">Kоробка передач</h1>
        <div class=" flex">
          <div class="w-50 flex flex-column leading-tight h-10">
            <v-checkbox class="h-8" :label="`выбрано`"></v-checkbox>
            <v-checkbox :label="`выбрано`"></v-checkbox>
          </div>
          <div class="w-50 flex "><v-checkbox :label="`carfax`"></v-checkbox></div>
        </div>
      </div>
      <!--  -->
      <div class="mt-4 h-22">
        <h1 class="font-bold">Местонахождение</h1>
        <div class="car_type mt-2  flex gap-2">
          <div class="countr_left w-50">
            <h1>Страна</h1>
            <v-select label="country" density="compact" single-line persistent-hint
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
          </div>
          <div class="countr_right w-50">
            <h1>Город</h1>
            <v-select label="Select" density="compact" single-line
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
          </div>
        </div>
      </div>
      <!-- --- -->
      <div class="mt-4">
        <h1 class="font-bold">Местонахождение</h1>
        <div class="car_type mt-2  flex gap-2">
          <div class="countr_left w-50">
            <h1>Страна</h1>
            <v-select label="country" density="compact" single-line persistent-hint
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
          </div>
          <div class="countr_right w-50">
            <h1>Город</h1>
            <v-select label="Select" density="compact" single-line
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
          </div>
        </div>
      </div>
      <!--  -->
      <div class=" p-4">
        <h2 class="font-bold mb-2">
          Тип кузова <span class="font-normal text-sm">(внедорожник, пикап)</span>
        </h2>
        <div class="grid grid-cols-2 gap-x-8 gap-y-1">
          <label v-for="(type, index) in types" :key="index" class="flex gap-2 items-center space-x-2">
            <input type="checkbox" v-model="selectedTypes" :value="type" class="w-4 h-4" />
            <span class="text-sm">{{ type }}</span>
          </label>
        </div>
      </div>
      <!--  -->
      <div class=" p-4">
        <h2 class="font-bold mb-2">
          Тип кузова <span class="font-normal text-sm">(внедорожник, пикап)</span>
        </h2>
        <div class="grid grid-cols-2 gap-x-8 gap-y-1">
          <label v-for="(type, index) in types" :key="index" class="flex gap-2 items-center space-x-2">
            <input type="checkbox" v-model="selectedTypes" :value="type" class="w-4 h-4" />
            <span class="text-sm">{{ type }}</span>
          </label>
        </div>
      </div>
      <!--  -->
      <div>
        <h1 class="font-bold">Kоробка передач</h1>
        <div class=" flex">
          <div class="w-50 flex leading-tight h-10"><v-checkbox :label="`выбрано`"></v-checkbox></div>
          <div class="w-50 flex "><v-checkbox :label="`carfax`"></v-checkbox></div>
        </div>
      </div>
    </div>

    <div class="div w-100">
      <v-btn class="w-full  bg-blue-darken-1">
        сбросить параметры поиска
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: '1000',
        },
        {
          name: '2000',
        },
        {
          name: '3000',
        },
        {
          name: '4000',
        },
        {
          name: '5000',
        },
        {
          name: '6000',
        },
      ],
      selectedState: null,
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan',
        'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      types: [
        "седан",
        "хэтчбек",
        "внедорожник",
        "минивэн",
        "универсал",
        "кабриолет",
        "спорт-кар",
        "пикап",
        "микроавтобус",
        "автобус",
        "грузовик",
        "прицепы",
        "мотоцикл",
        "скутер",
        "квадроцикл",
        "плавсредство",
        "спецтехника",
      ],
      selectedTypes: [],
      showTech: false
    }
  },
  methods: {
    showTechnical() {
      this.showTech = !this.showTech
    }
  }
}
</script>
<style lang="">

</style>