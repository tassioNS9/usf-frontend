<template>
    <section>
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-4 rounded-lg">
            <CardComponent>
                <h2 class=" text-xl font-bold text-indigo-700">REGISTAR NOVO OBJETIVO</h2>
            </CardComponent>
            <form action="#" @submit.prevent="createObjective" method="post">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 ">Descrição
                        </label>
                        <textarea type="text" name="description" id="description" v-model="dataObjective.description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3.5"
                            placeholder="" />
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.description.$error">
                            {{ "Descrição Obrigatória!" }}</p>
                    </div>

                    <div class="w-full">
                        <label for="numeration" class="block mb-2 text-sm font-medium text-gray-900 ">Númeração</label>
                        <input type="number" name="numeration" id="numeration" v-model="dataObjective.numeration"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="">
                    </div>
                    <div class="w-full">
                        <label for="guideline" class="block mb-2 text-sm font-medium text-gray-900 ">Numeração diretriz
                            referente</label>
                        <select id="guideline" v-model="guidelineSelected"
                            class=" w-full truncate w-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                            <option selected :value=0>Selecione</option>
                            <option v-for="(guideline, index) in dataGuidelines" :value="guideline.id">{{ guideline.numeration}}</option>
                        </select>
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.id_guideline.$error">
                            {{ "Objetivo Obrigatório!" }}</p>
                    </div>
                </div>

                <button type="submit"
                    class=" w-full lg:w-1/4 bg-indigo-700 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-indigo-800">
                    Registrar
                </button>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { required, minLength, maxLength } from '@vuelidate/validators'
import axiosInstance from '@/services/api';
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core'
import useGuidelinesList from '@/composables/useGuidelinesList';
import { helpers } from "@vuelidate/validators";
import { type Objective } from "@/types/objective";
import CardComponent from '@/components/CardComponent.vue'

const dataObjective = ref<Objective>({
    id: 0,
    numeration: 0,
    description: '',
    id_guideline: 0,
})

const guidelineSelected = ref(0)

const rules = computed(() => {

    return {
        numeration: { required },
        description: { required, }, // Matches state.firstName
        id_guideline: { required }, // Matches state.lastName
    }
})

const v$ = useVuelidate(rules, dataObjective)


const createObjective = async () => {
    const result = await v$.value.$validate()
    if (result) {
        axiosInstance.post('/api/Objectives',
            {
                description: dataObjective.value.description,
                numeration: dataObjective.value.numeration,
                id_guideline: dataObjective.value.id_guideline

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Novo objetivo registrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

        }).catch(err => {
            Swal.fire({
                title: 'Erro ao cadastrar objetivo!',
                text: `${err.response.data.message}`,
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

const {dataGuidelines} = useGuidelinesList()

</script>