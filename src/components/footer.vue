<template>
  <div class="footer-container">
    <!-- Linklar qatori -->
    <v-row>
      <v-col cols="10" class="text-start">
        <div class="footer-links">
          <a v-for="(link, index) in links" :key="index" :href="link.url" class="footer-link">
            {{ link.text }}
          </a>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <p class="support-info text-start">
          <strong>горячая линия поддержки</strong> <span>+995 322 05 05 55</span> <br />
          <strong>сервис-центр AUTOPAPA</strong> <span>+995 591 11 46 21</span>
        </p>
        <p class="copyright text-start">
          &copy; 2013, «Autopapa» — главный авто портал Кавказа. Все права защищены.
        </p>
      </v-col>

      <v-col cols="12" md="4" class="social-icons">
        <i class="fa-brands fa-facebook text-5xl cursor-pointer" style="color: #74C0FC;"></i>
        <i class="fa-brands fa-youtube text-5xl cursor-pointer " style="color: #f52d0a;"></i>
        <i class="fa-brands fa-telegram text-5xl cursor-pointer " style="color: #74C0FC;"></i>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const links = [
  { text: "О нас", url: "#" },
  { text: "Дистанционное обслуживание покупателя", url: "#" },
  { text: "Реклама", url: "#" },
  { text: "ПРАВИЛА", url: "#" },
  { text: "FAQ", url: "#" },
  { text: "Где больше битков?", url: "#" },
  { text: "Пограничные таможенные пункты пропуска", url: "#" },
  { text: "Публичный договор Mikado", url: "#" },
  { text: "Карта сайта", url: "#" },
  { text: "Сообщить об ошибке", url: "#" },
];
</script>

<style scoped>
.footer-container {
  background: white;
  padding: 16px;
  font-size: 14px;
  border-top: 1px solid #ddd;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-link {
  color: rgba(0, 0, 255, 0.721);
  text-decoration: none;
  font-weight: bold;
  text-align: start;
}

.footer-link:hover {
  text-decoration: underline;
}

.support-info {
  font-size: 14px;
  color: black;
}

.copyright {
  font-size: 12px;
  color: gray;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
