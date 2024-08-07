<template>
    <DefaultLayout>
        <div class="bg-slate-300 rounded-3xl min-h-[600px] p-8 text-cyan-600">
            <section>
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-4">
                    <CardComponent>
                        <h2 class=" text-xl font-bold text-indigo-700 ">REGISTAR NOVO INDICADOR</h2>
                    </CardComponent>
                    <form action="#" @submit.prevent="createIndicator" method="post">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 ">Descrição
                                </label>
                                <input type="text" name="description" id="description"
                                    v-model="dataIndicator.description"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.description.$error">
                                    {{ "Descrição Obrigatória!" }}</p>
                            </div>
     
                            <div class="w-full">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 ">Fontes</label>
                                <input type="text" name="brand" id="brand" v-model="dataIndicator.sources"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="">

                            </div>
                            <div class="w-full">
                                <label for="guideline" class="block mb-2 text-sm font-medium text-gray-900 ">Numeração
                                    diretriz
                                    referente</label>
                                <select id="guideline" v-model="guidelineSelected"
                                    class=" w-full truncate w-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                                    <option selected :value=0>Selecione</option>
                                    <option v-for="(guideline, index) in dataGuidelines" :value="guideline.id">{{
                                        guideline.numeration}}</option>
                                </select>
                            </div>

                            <div v-if="guidelineSelected !== 0" class="w-[200px]">
                                <label for="objective" class="block mb-2 text-sm font-medium text-gray-900 ">Númeração
                                    Objetivo Referente</label>
                                <select id="objective" v-model="dataIndicator.id_objective"
                                    class=" w-full truncate w-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                                    <option v-for="(objective, index) in dataObjectivesByGuideline"
                                        :value="objective.id">{{ objective.numeration }}</option>
                                </select>
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.id_objective.$error">
                                    {{ "Objetivo Obrigatório!" }}</p>
                            </div>
                            <div>
                                <div class="sm:col-span-4">
                                    <label for="type_indicator"
                                        class="block text-sm font-medium leading-6 text-gray-900">Tipo
                                        do indicador
                                    </label>
                                    <div class="flex mt-3">
                                        <div class=" sm:col-span-4 flex items-center me-4">
                                            <input id="inline-radio" type="radio" :value="TypeIndicators.BOOL"
                                                name="inline-radio-group" v-model="dataIndicator.type_Indicator"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2">
                                            <label for="inline-radio"
                                                class="ms-2 text-sm font-medium text-gray-900">Binário
                                            </label>
                                        </div>
                                        <div class="flex items-center me-4">
                                            <input id="inline-2-radio" type="radio" :value="TypeIndicators.NUMERIC"
                                                name="inline-radio-group" v-model="dataIndicator.type_Indicator"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2">
                                            <label for="inline-2-radio"
                                                class="ms-2 text-sm font-medium text-gray-900">Númerico</label>
                                        </div>
                                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.type_Indicator.$error">
                                            {{ "Tipo do indicador é Obrigatório!" }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit"
                            class=" w-full lg:w-1/4 bg-indigo-700 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-indigo-800">
                            Salvar
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { required } from '@vuelidate/validators'
import axiosInstance from '@/services/api';
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
import { type Indicator } from "@/types/indicators";
import CardComponent from '@/components/CardComponent.vue'
import DefaultLayout from "@/components/DefaultLayout.vue";
import useGuidelinesList from "@/composables/useGuidelinesList";
import { type Objective } from "@/types/objective";

enum TypeIndicators {
    BOOL = 'BOOL',
    NUMERIC = 'NUMERIC'
}

const dataObjectivesByGuideline = ref<Objective[]>([])
const dataIndicator = ref<Indicator>({
    id: 0,
    description: '',
    id_objective: 0,
    type_Indicator: TypeIndicators.NUMERIC,
    sources: '',
})



const guidelineSelected = ref(0)
const objectiveSelected = ref(0)
const rules = computed(() => {

    return {
        description: { required, }, // Matches state.firstName
        id_objective: { required }, // Matches state.lastName
        type_Indicator: { required },
    }
})

const v$ = useVuelidate(rules, dataIndicator)


const isload = ref(false)

const getObjectivesByGuideline = async () => {
    isload.value = true
    await axiosInstance.get(`/api/objectives/guideline/${guidelineSelected.value}`).then(
        response => (dataObjectivesByGuideline.value = response.data.data))
        .catch((error) => {
            console.log(error);
        });
    isload.value = false
}

watch(guidelineSelected, (newQuestion, oldQuestion) => {
    getObjectivesByGuideline()

})


const createIndicator = async () => {
    const result = await v$.value.$validate()
    console.log(dataIndicator.value, 'dados')
    if (result) {
        axiosInstance.post('/api/indicators',
            {
                description: dataIndicator.value.description,
                id_objective: dataIndicator.value.id_objective,
                type_Indicator: dataIndicator.value.type_Indicator,
                sources: dataIndicator.value.sources,

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Indicador registrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

        }).catch(err => {
            Swal.fire({
                title: 'Erro ao cadastrar Indicador!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao cadastrar!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

const { dataGuidelines } = useGuidelinesList()

onMounted(() => {
    getObjectivesByGuideline()
})

</script>