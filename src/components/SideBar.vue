

<template>
    <div class="flex">
        <!-- Backdrop -->
        <div :class="isOpen ? 'block' : 'hidden'"
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" @click="isOpen = false" />
        <!-- End Backdrop -->

        <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
            class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
            <div class="flex items-center justify-center mt-8">
                <div class="flex items-center">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">

                    <span class="mx-2 text-2xl font-semibold text-white">UFS Sistemas</span>
                </div>
            </div>

            <nav class="mt-10">
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 "
                    :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/app/dashboard">
                    <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                            fill="currentColor" />
                        <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
                            fill="currentColor" />
                    </svg>

                    <span class="mx-4">Dashboard</span>
                </router-link>
        
                <div v-if="auth.role === 'ADMIN'">       
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaUsuarios' ? activeClass : inactiveClass]" to="/app/lista-usuarios">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Usuários</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaUnidades' ? activeClass : inactiveClass]" to="/app/lista-unidades">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Unidades</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Indicadores' ? activeClass : inactiveClass]" to="/app/indicadores">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Cadastrar Indicador</span>
                </router-link>

                
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaIndicadores' ? activeClass : inactiveClass]" to="/app/lista-indicadores">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Indicadores</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'ListaAvaliacoes' ? activeClass : inactiveClass]" to="/app/lista-avaliacoes">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Lista de Avaliações</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'RegistroUsuario' ? activeClass : inactiveClass]" to="/app/registro-usuario">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Cadastar Usuário</span>
                </router-link>
                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'RegistroUnidade' ? activeClass : inactiveClass]" to="/app/registro-unidade">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Cadastar Unidade</span>
                </router-link>
               
            </div>
          
           

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Avaliacoes' ? activeClass : inactiveClass]" to="/app/avaliacoes">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fill-rule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clip-rule="evenodd" />
                    </svg>

                    <span class="mx-4">Avaliações</span>
                </router-link>

                <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
                    :class="[$route.name === 'Perfil' ? activeClass : inactiveClass]" to="/app/perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>

                    <span class="mx-4">Meu Perfil</span>
                </router-link>
               <a
                  class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4">
                  <svg
                     class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span @click="logout()" class=" text-gray-500 duration-200 mx-4 cursor-pointer">Sair</span> 
               </a>
         
            </nav>
        </div>
    </div>
</template>

<!-- <script setup lang="ts">

</script> -->


<script setup>
import { ref,onMounted } from 'vue'
import { useSidebar } from '../composables/useSidebar'
 import { useAuth } from "@/stores/auth";

 const auth = useAuth();


 const logout =  () => {
    auth.clear()
 }

const { isOpen } = useSidebar()
const activeClass = ref(
    'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
    'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)

</script>

<style></style>