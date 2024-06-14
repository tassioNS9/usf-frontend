<template>

  <section class="bg-[url('@/assets/background-main.jpg')]  ">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
      <div class="flex bg-indigo-700 w-full absolute top-0 h-20 items-center justify-end">
        <a href="/app/dashboard" :class="auth.isAuth ? 'block' : 'hidden'"
          class="flex w-[105px] mr-10 items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
          Voltar 
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        UFS SISTEMAS
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-indigo-900 underline text-center md:text-2xl ">
            Faça login em sua conta
          </h1>
          <form class="space-y-4 md:space-y-6" action="post" @submit.prevent="login">
            <div>
              <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900 ">CPF</label>
              <input type="text" name="cpf" id="cpf" v-model="user.cpf"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Seu CPF" required="true">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Senha</label>
              <input type="password" name="password" id="password" v-model="user.password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required="true">
              <p class="px-2 mt-2 text-xs text-red-600 " v-if="errorLogin">
                {{ "CPF ou senha incorretos!" }}</p>
            </div>
            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md  bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">

import api from '@/services/api';
import { reactive, ref } from 'vue';
import { useAuth } from '@/stores/auth.js';
import { useRouter } from "vue-router";
const auth = useAuth();
const router = useRouter()
const user = reactive({
  cpf: '',
  password: ''
})
const errorLogin = ref(false)

async function login() {

  await api.post('/api/auth', user, {
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    errorLogin.value = false
    auth.setToken(response.data.user.token);
    auth.setUser(response.data.user);
    auth.setIsAuth(true);
    router.push('/app/dashboard')
    window.location.href = '/app/dashboard'
  }).catch(err => {
    errorLogin.value = true

  });
}

</script>

<style scoped></style>