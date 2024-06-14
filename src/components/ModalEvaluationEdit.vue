<template>
    <ModalCardComponent>
        <div class="min-w-[250px] px-4 py-8 mx-auto lg:py-16">
            <CardComponent>
                <h2 class="mb-4 text-xl font-bold text-indigo-700 ">Registar avaliação</h2>
            </CardComponent>
            <form action="post" @submit.prevent="createEvaluation">
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-2" v-if="typeIndicatorData === 'NUMERIC'">
                        <label for="valueNum" class="block mb-2 text-sm font-medium text-gray-900 ">Valor</label>
                        <input type="number" name="valueNum" id="valueNum" v-model="dataEvaluation.valueNum"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.valueNum?.$error">
                            {{ "Valor é Obrigatório!" }}</p>
                    </div>
                    <div class="sm:col-span-2" v-if="typeIndicatorData === 'BOOL'">
                        <label for="valueBol" class="block mb-2 text-sm font-medium text-gray-900 ">Valor</label>
                        <div class="flex items-center ps-4 border border-gray-200 rounded ">
                            <input id="bordered-radio-1" type="radio" v-model="dataEvaluation.valueBol" :value=true
                                name="bordered-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 ">
                            <label for="bordered-radio-1"
                                class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">SIM</label>
                        </div>
                        <div class="flex items-center ps-4 border border-gray-200 rounded ">
                            <input id="bordered-radio-2" type="radio" name="bordered-radio"
                                v-model="dataEvaluation.valueBol" :value=false
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                            <label for="bordered-radio-2"
                                class="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">NÃO</label>

                        </div>
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.valueBol?.$error">
                            {{ "Selecione uma opção!" }}</p>
                    </div>

                    <div class="sm:col-span-2">
                        <input type="month" v-model="dataEvaluation.date_evaluation"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.date_evaluation.$error">
                            {{ "Data inválida!" }}</p>
                    </div>
                </div>
                <div class=" flex items-center space-x-4">
                    <button type="submit"
                        class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
                        CONFIRMAR
                    </button>
                </div>
            </form>
        </div>
    </ModalCardComponent>
</template>



<script setup lang="ts">
import ModalCardComponent from './ModalCardComponent.vue';
import CardComponent from './CardComponent.vue';
</script>

<style scoped></style>