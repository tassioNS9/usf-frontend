<template>
    <DefaultLayout>
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div class="container mx-auto px-6 py-8">
                <section class="bg-slate-300  rounded-3xl  p-8 text-cyan-600">
                    <div class="max-w-3xl mx-auto px-4 py-8  lg:py-1">
                        <CardComponent>
                            <h2 class=" text-xl font-bold text-indigo-700 ">Meu Perfil</h2>
                        </CardComponent>
                        <Loading v-if="load" />
                        <form action="#" v-else-if="!load">
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Nome</label>
                                    <input type="text" name="name" id="name" v-model="userData.name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                                </div>
                                <div class="w-full">
                                    <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900 ">CPF</label>
                                    <input type="text" name="cpf" id="cpf" v-model="userData.cpf" readonly
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                                </div>
                                <div class="w-full">
                                    <label for="office"
                                        class="block mb-2 text-sm font-medium text-gray-900 ">Cargo/Função</label>
                                    <input type="text" name="office" id="office" v-model="userData.office"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                                </div>
                                <div v-if="userData.unit !== null"class="sm:col-span-2">
                                    <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 ">Unidade
                                        de
                                        Saúde</label>
                                    <h2
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                        {{ userData.unit?.name }}
                                    </h2>
                                </div>

                                <div class="w-full">
                                    <label for="office"
                                        class="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                    <input type="text" name="office" id="office"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
                                </div>

                                <div class="w-full">
                                    <label for="office" class="block mb-2 text-sm font-medium text-gray-900">
                                        Confirmar Senha</label>
                                    <input type="text" name="office" id="office"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        value="">
                                </div>

                            </div>
                            <div class="flex items-center space-x-4 mt-1">
                            <button type="submit"
                                class=" w-full lg:w-1/4 bg-indigo-700 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-indigo-800">
                                Atualizar
                            </button>
                        </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuth } from '@/stores/auth.js';
import Loading from '@/components/Loading.vue';
import CardComponent from '@/components/CardComponent.vue'
import { type User } from '@/types/user';
import DefaultLayout from '@/components/DefaultLayout.vue';
const load = ref(false);
const auth = useAuth();

const userData = ref<User>({
    id: 0,
    id_unit: 0,
    name: '',
    password: '',
    cpf: '',
    office: '',
    role:auth.userAuthetincated.role
})


const rules = computed(() => {
    return {
        name: { required },
        office: { required },
    }
})

const v$ = useVuelidate(rules, userData)

onMounted(async () => {
    load.value = true
    userData.value = await auth.checkToken()
    load.value = false
})

</script>

<style scoped></style>
