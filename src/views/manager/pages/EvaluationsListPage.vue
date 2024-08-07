<template>
    <DefaultLayout>
    <Container>
        <CardComponent>
            <h3 class="text-xl font-bold text-indigo-700">
                LISTA DE INDICADORES
            </h3>
        </CardComponent>

        <Loading v-if="isload" />
        <div class="relative overflow-x-auto shadow-md bg-white sm:rounded-lg" v-else>
                <div
                    class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form class="flex items-center">
                            <InputSearch v-model="searchDescription" />
                        </form>
                    </div>
                    <div class="flex">
                        <div class="flex items-center me-4">
                            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 ">Filtrar:</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                                v-model="typeIndicator"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 ">Todos</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-radio" type="radio" value="NUMERIC" name="inline-radio-group"
                                v-model="typeIndicator"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                            <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 ">NUMÉRICO</label>
                        </div>
                        <div class="flex items-center me-4">
                            <input id="inline-2-radio" type="radio" value="BOOL" name="inline-radio-group"
                                v-model="typeIndicator"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                            <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 ">BINÁRIO</label>
                        </div>
                    </div>
                </div>

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Objetivo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tipo Indicador
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Fontes
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Editar</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredIndicators.length > 0" class="bg-white border-b   hover:bg-gray-50 "
                            v-for="(indicator, index) in filteredIndicators" :key="indicator.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ indicator.description }}
                            </th>
                            <td class="px-6 py-4">
                                {{ indicator.id_objective }}
                            </td>
                            <td class="px-6 py-4">
                                {{ indicator.type_Indicator === 'NUMERIC' ? 'Númerico' : 'Binário' }}
                            </td>

                            <td class="px-6 py-4">
                                {{ indicator.sources }}
                            </td>
                            <td class="flex gap-2 px-6 py-4 text-right justify-between items-center ">
                                <p @click="viewAvalation(indicator.id)" class="font-medium text-blue-600  hover:cursor-pointer hover:underline">Visualizar</p>   
                            </td>
                        </tr>

                        <tr class="flex w-full justify-center border-b  hover:bg-gray-400" v-else>
                            <td class=" py-6 ">Indicador Não Encontrado!</td>
                        </tr>
                    </tbody>
                </table>
            </div>    
    </Container>
</DefaultLayout>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, onMounted, computed } from 'vue'
import useIndicatorsList from '@/composables/useIndicatorsList';
import Loading from '@/components/Loading.vue';
import InputSearch from '@/components/InputSearch.vue';
import CardComponent from '@/components/CardComponent.vue'
import Container from '@/components/Container.vue'
import DefaultLayout from '@/components/DefaultLayout.vue';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const searchDescription = ref('')
const typeIndicator = ref('')


const authStore = useAuth()

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token


const filteredIndicators = computed(() => {
    let indicators = dataIndicators.value


    if (searchDescription.value !== '') {
        indicators = indicators.filter(item => item.description.toLowerCase().includes(searchDescription.value.toLowerCase()))
    }

    if (typeIndicator.value !== '') {
        indicators = indicators.filter(user => user.type_Indicator === typeIndicator.value)
    }
    return indicators;
})

const viewAvalation = (id: number | undefined) =>{
    router.push(`/app/lista-avaliacoes/${authStore.isAuthenticated.token}/${id}`)
}



const { dataIndicators, isload } = useIndicatorsList()

</script>