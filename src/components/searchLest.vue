<template>
  <v-container>
    <v-tabs v-model="activeTab" align-tabs="center">
      <v-tab v-for="(service, index) in services" :key="index" :value="service.name">
        <small>{{ service.name }}</small>
      </v-tab>
    </v-tabs>

    <v-tabs-window class="mt-3" v-model="activeTab">
      <v-tabs-window-item v-for="(service, index) in services" :key="index" :value="service.name">
        <v-card class="pa-5">
          <v-card-title>{{ service.name }}</v-card-title>
          <v-card-text>{{ service.description }}</v-card-text>
          <v-btn color="primary" @click="openDialog(service.name)">Оставить заявку</v-btn>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Оставить заявку - {{ selectedService }}</v-card-title>
        <v-card-text>
          <v-text-field label="Имя" v-model="form.name"></v-text-field>
          <v-text-field label="Телефон" v-model="form.phone"></v-text-field>
          <v-checkbox label="Согласен на обработку ПДН" v-model="form.consent"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submitForm">Отправить заявку</v-btn>
          <v-btn @click="dialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!--  -->

    <!--  -->
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      activeTab: 'Растаможа',
      dialog: false,
      selectedService: '',
      form: { name: '', phone: '', consent: false },
      services: [
        { name: 'Растаможа', description: 'Условия и информация о стоимости.' },
        { name: 'Автокредит', description: 'Кредитные условия и калькулятор.' },
        { name: 'Подбор автомобилей', description: 'Консультация по выбору авто.' },
        { name: 'Продажа Вашего автомобиля', description: 'Помощь в продаже авто.' },
        { name: 'Выкуп', description: 'Быстрый выкуп вашего авто.' },
        { name: 'Trade-In', description: 'Обмен старого авто на новый.' },
        { name: 'Помощь на дорогах', description: 'Экстренная помощь водителям.' },
        { name: 'Оформление ОСАГО, КАСКО', description: 'Страховка для вашего авто.' },
        { name: 'Юридическая помощь', description: 'Консультации и поддержка.' },
        { name: 'Помощь в постановке на учет', description: 'Регистрация ТС.' },
        { name: 'Продажа гос номеров', description: 'Элитные гос номера.' }
      ]
    };
  },
  methods: {
    openDialog(service) {
      this.selectedService = service;
      this.dialog = true;
    },
    submitForm() {
      this.dialog = false;
    }
  }
};
</script>
