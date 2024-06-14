<template>
    <DefaultLayout>
    <Container>
        <CardComponent>
            <h3 class="text-xl font-bold text-indigo-700">
                Lista de Indicadores
            </h3>
        </CardComponent>
        <div class="relative overflow-x-auto shadow-md bg-white sm:rounded-lg">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <InputSearch v-model="descriptionSearch" />
                    </form>
                </div>
                <div class="flex">
                    <div class="flex items-center me-4">
                        <label for="inline-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">Filtrar:</label>
                    </div>
                    <div class="flex items-center me-4">
                        <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                            v-model="typeIndicatorData"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                        <label for="inline-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">Todos</label>
                    </div>
                    <div class="flex items-center me-4">
                        <input id="inline-radio" type="radio" value="NUMERIC" name="inline-radio-group"
                            v-model="typeIndicatorData"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                        <label for="inline-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">NUMÉRICO</label>
                    </div>
                    <div class="flex items-center me-4">
                        <input id="inline-2-radio" type="radio" value="BOOL" name="inline-radio-group"
                            v-model="typeIndicatorData"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                        <label for="inline-2-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">BINÁRIO</label>
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
                            Dimensão
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
                    <tr class="bg-white border-b hover:bg-gray-50 "
                        v-for="(indicator, index) in filteredIndicators" :key="indicator.id">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ indicator.description }}
                        </th>
                        <td class="px-6 py-4">
                            {{ indicator.objective }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.type_Indicator === 'NUMERIC' ? 'Númerico' : 'Binário' }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.dimension }}
                        </td>
                        <td class="px-6 py-4">
                            {{ indicator.sources }}
                        </td>
                        <td @click="openEditModal(indicator)" class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600  hover:underline">Avaliar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Container>

    <ModalCardComponent>
                    <CardComponent>
                        <h2 class="text-xl font-bold text-indigo-700 ">Registar avaliação</h2>
                    </CardComponent>
                    <form action="post" @submit.prevent="createEvaluation">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-8">
                            <div class="sm:col-span-2" v-if="typeIndicatorData === 'NUMERIC'">
                                <label for="valueNum"
                                    class="block mb-2 text-sm font-medium text-gray-900">Valor</label>
                                <input type="number" name="valueNum" id="valueNum" v-model="dataEvaluation.valueNum"
                                    class="remove-arrows bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.valueNum?.$error">
                                    {{ "Valor é Obrigatório!" }}</p>
                            </div>
                            <div class="sm:col-span-2" v-if="typeIndicatorData === 'BOOL'">
                                <label for="valueBol"
                                    class="block mb-2 text-sm font-medium text-gray-900">Valor</label>
                                <div class="flex items-center ps-4 border border-gray-200 rounded ">
                                    <input id="bordered-radio-1" type="radio" v-model="dataEvaluation.valueBol"
                                        :value=true name="bordered-radio"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 ">
                                    <label for="bordered-radio-1"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900">SIM</label>
                                </div>
                                <div class="flex items-center ps-4 border border-gray-200 rounded ">
                                    <input id="bordered-radio-2" type="radio" name="bordered-radio"
                                        v-model="dataEvaluation.valueBol" :value=false
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 ">
                                    <label for="bordered-radio-2"
                                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900">NÃO</label>

                                </div>
                                <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.valueBol?.$error">
                                    {{ "Selecione uma opção!" }}</p>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="date"
                                class="block mb-2 text-sm font-medium text-gray-900">Data</label>
                                <input type="month" v-model="dataEvaluation.date_evaluation"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600 "
                                    v-if="v$.date_evaluation.$error">
                                    {{ "Data inválida!" }}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <button type="submit"
                                class=" bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Enviar
                            </button>
                            <button type="button"
                                class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Cancelar
                            </button>
                        </div>
                    </form>
    </ModalCardComponent>
</DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, maxValue } from '@vuelidate/validators'
import axiosInstance from '@/services/api';
import { useAuth } from "@/stores/auth";
import { type Evaluation } from "@/types/user";
import Container from '@/components/Container.vue'
import CardComponent from '@/components/CardComponent.vue'
import InputSearch from '@/components/InputSearch.vue'
import ModalCardComponent from "@/components/ModalCardComponent.vue";
import useModalToggle from "@/composables/useModalToggle";
import useIndicatorsList from "@/composables/useIndicatorsList";
import DefaultLayout from "@/components/DefaultLayout.vue";

const auth = useAuth();

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token

enum typeIndicator {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC',
}

const typeIndicatorData = ref('')
const {isOpenModal} = useModalToggle()
const dataEvaluation = ref<Evaluation>({
    id_indicator: 0,
    id_unit: 0,
    date_evaluation: '' as any,
    evaluator: auth.fullName,
    valueNum: null,
    valueBol: true
})
const descriptionSearch = ref('')

const filteredIndicators = computed(() => {
    let indicators = dataIndicators.value


    if (descriptionSearch.value !== '') {
        indicators = indicators.filter(item => item.description.includes(descriptionSearch.value))
    }

      if (typeIndicatorData.value !== '') {
        indicators = indicators.filter(user => user.type_Indicator === typeIndicatorData.value)
      }
    return indicators;
})

const openEditModal = (data: any) => {
    isOpenModal.value = true
    typeIndicatorData.value = data.type_Indicator
    dataEvaluation.value.id_indicator = data.id
}

const rules = computed(() => {

    if (typeIndicatorData.value === typeIndicator.BOOL) {
        dataEvaluation.value.valueNum = null
        return {
            id_indicator: { required },
            id_unit: { required },
            date_evaluation: { required, minValue: minValue(new Date('2023-01-01') as any), maxValue: maxValue(new Date() as any) },
            valueBol: { required }
        }
    } else {
        dataEvaluation.value.valueBol = null
        return {
            id_indicator: { required },
            id_unit: { required },
            date_evaluation: { required, minValue: minValue(new Date('2023-01-01') as any), maxValue: maxValue(new Date() as any) },
            valueNum: { required, minValue: minValue(0) }
        }
    }


})

const v$ = useVuelidate(rules, dataEvaluation)


const createEvaluation = async () => {
    console.log('first', dataEvaluation.value.date_evaluation)
    dataEvaluation.value.date_evaluation = new Date(dataEvaluation.value.date_evaluation)
    console.log(dataEvaluation.value.date_evaluation)


    const result = await v$.value.$validate()
    console.log(result)
    console.log(v$.value)

    if (result) {
        
        await axiosInstance.post('/api/evaluations',
            {
                id_indicator: dataEvaluation.value.id_indicator,
                id_unit: auth.userAuthetincated.id_unit,
                evaluator: dataEvaluation.value.evaluator,
                date_evaluation: dataEvaluation.value.date_evaluation,
                valueNum: dataEvaluation.value.valueNum,
                valueBol: dataEvaluation.value.valueBol

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Avaliação criada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao criar avaliação!',
                text: `${err.response.data.message}`,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao criar avaliação!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
     }

}

const {dataIndicators, isload} = useIndicatorsList()

</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
}
input[type=number] { 
   -moz-appearance: textfield;
   appearance: textfield;

}

</style>