<template>
    <DefaultLayout>
    <Container>
        <CardComponent>
            <h3 class="text-xl font-bold text-indigo-700">
                Lista de Avaliações
            </h3>
        </CardComponent>
        <Loading v-if="isload" />
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white" v-else>
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <select id="unit" v-model="unitSelected"
                    class="w-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                    <option v-for="(unit, index) in dataUnits" :value="unit.id">{{ unit.name }}</option>
                </select>

                
                <select id="unit" v-model="yearSelected"
                    class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                    <option :value=2024>2024</option>
                    <option :value=2023>2023</option>

                </select>

            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>

                        <th scope="col" class="px-6 py-3">
                            Indicador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tipo do Indicador
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Avaliador(a)
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Valor
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Mês da Avaliação
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b  hover:bg-gray-50"
                        v-for="(evaluation, index) in dataEvaluations" :key="evaluation.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ evaluation?.indicator?.description }}
                        </th>
                        <td class="px-6 py-4">
                            {{ evaluation?.indicator?.type_Indicator === 'NUMERIC' ? 'NÚMERICO' : 'BOOLEAN' }}
                        </td>
                        <td class="px-6 py-4">
                            {{ evaluation?.evaluator }}
                        </td>
                        <td class="px-6 py-4">
                            {{ evaluation.valueBol === null ? evaluation.valueNum : formatTypeBol(evaluation.valueBol)
                            }}
                        </td>
                        <td class="px-6 py-4">
                            {{ formatData(evaluation.date_evaluation.toString()) }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <NavPage /> -->
        </div>
    </Container>
</DefaultLayout>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, onMounted, watch } from 'vue'
import Loading from '@/components/Loading.vue';
import { formatData } from '@/utils/formatDate'
import { formatTypeBol } from '@/utils/formatTypeBol';
import CardComponent from '@/components/CardComponent.vue'
import Container from '@/components/Container.vue'
import useEvaluationsList from '@/composables/useEvaluationsList';
import useUnitsList from '@/composables/useUnitsList';
import {type Evaluation} from '@/types/evaluations'
import DefaultLayout from '@/components/DefaultLayout.vue';
const unitSelected = ref(1)
const yearSelected = ref(2024)
const isload = ref(true)
import { useAuth } from '@/stores/auth';
const dataEvaluations = ref<Evaluation[]>([])

const authStore = useAuth()

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token


const getEvaluationsList = async () => {
        isload.value = true
        await axiosInstance.get(`/api/evaluations/unit/${unitSelected.value}/year/${yearSelected.value}`).then(
            response => (dataEvaluations.value = response.data.data))
            .catch((error) => {
                console.log(error);
            });
            isload.value = false
    }

watch(unitSelected, (newQuestion, oldQuestion) => {
    getEvaluationsList()
}, { deep: true })

watch(yearSelected, (newQuestion, oldQuestion) => {
    getEvaluationsList()
}, { deep: true })



onMounted(()=>{
    getEvaluationsList()
})

const {dataUnits} = useUnitsList()

</script>