<template>
  <div class="mt-10">

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field v-model="user" density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a>
      </div>

      <v-text-field v-model="pass" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <v-btn @click="login" class="mb-8" color="blue" size="large" variant="tonal" block>
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
// import { onMounted } from 'vue'
const visible = ref(false)
const user = ref('')
const pass = ref('')
const router = useRouter()
import { useToast } from 'vue-toastification'
const toast = useToast()

async function login() {
  try {
    const res = await api.post('/login', {
      username: user.value,
      password: pass.value
    })
    if (res.status === 200) {
      toast.success("Muvaffaqiyatli tizimga kirdingiz!")
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      router.push({ name: 'user' })
    } else if (res.status === 401) {
      toast.error("Login yoki parol xato!")
    } else if (res.status === 403) {
      toast.error("Sizda tizimga kirish huquqi yo'q!")
    }
  } catch (error) {
    toast.error("Xatolik yuz berdi!")
    console.log(error)
  }
}

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push({ name: 'user' })
  }
})

</script>