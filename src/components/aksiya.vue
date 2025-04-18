<template>
  <v-container>
    <v-card class="pa-5 mb-3 text-center" color="red lighten-5">
      <v-card-title class="text-h6">
        🔥Мы стараемся сделать Вашу покупку еще приятнее!🔥
      </v-card-title>
      <v-card-text>
        Воспользуйтесь действующими акциями нашего автосалона.
      </v-card-text>
    </v-card>

    <!-- Yangi Carousel -->
    <v-slide-group show-arrows center-active>
      <v-slide-group-item v-for="(offer, index) in offers" :key="index">
        <v-card class="mx-2 pa-5 px-2 my-2 d-flex flex-column align-center" elevation="5" width="500">
          <v-card-title class="text-h6">{{ offer.title }}</v-card-title>
          <v-card-text class="text-center">{{ offer.description }}</v-card-text>
          <v-btn color="primary" @click="openDialog(offer)">Подробнее</v-btn>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <!-- Modal oynasi -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>{{ selectedOffer.title }}</v-card-title>
        <v-card-text>
          <p>{{ selectedOffer.description }}</p>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      selectedOffer: {},
      form: { name: '', phone: '', consent: false },
      offers: [
        {
          title: "🎁Акция «Приведи друга и получи 50 тыс рублей»",
          description: "Пригласите друга и получите 50 тыс рублей за рекомендацию!",
        },
        {
          title: "🎁Полный бак бензина в подарок!",
          description: "Получите полный бак топлива при покупке автомобиля.",
        },
        {
          title: "💰Скидка по Trade-in 100 тыс рублей!",
          description: "Обменивайте старый автомобиль и получите 100 тыс рублей скидки.",
        },
        {
          title: "💳Скидка по автокредиту до 100 тыс рублей!",
          description: "Оформите автокредит и получите до 100 тыс рублей скидки.",
        },
      ]
    };
  },
  methods: {
    openDialog(offer) {
      this.selectedOffer = offer;
      this.dialog = true;
    },
    submitForm() {
      alert(`Заявка отправлена: ${this.selectedOffer.title}`);
      this.dialog = false;
    }
  }
};
</script>
