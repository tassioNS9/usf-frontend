<template>
        <Container>
            <CardComponent>
                <h3 class="text-xl font-bold text-indigo-700">
                    LISTA DE OBJETIVOS
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
                </div>

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Numeração
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Diretriz
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Editar</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredObjectives.length > 0" class="bg-white border-b   hover:bg-gray-50 "
                            v-for="(objective, index) in filteredObjectives" :key="objective.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ objective.numeration }}
                            </th>
                            <td class="px-6 py-4">
                                {{ objective.description}}
                            </td>
                            <td class="px-6 py-4">
                                {{ objective.guideline?.numeration }} - {{ objective.guideline?.description }}
                            </td>

                            <td class="flex gap-2 px-6 py-4 text-right justify-between items-center ">
                                <p class="font-medium text-blue-600  hover:cursor-pointer hover:underline"
                                    @click="openEditModal(objective)">
                                    Editar</p>
                                <p @click="deleleObjective(objective)">
                                    <svg class="w-6 h-6 hover:cursor-pointer text-gray-800 dark:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke="red" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                    </svg>
                                </p>
                            </td>
                        </tr>

                        <tr class="flex w-full justify-center border-b  hover:bg-gray-400" v-else>
                            <td class=" py-6 ">Objetivo Não Encontrado!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>

        <ModalCardComponent>
            <CardComponent>
                <Title text="Atualizar Objetivo" />
            </CardComponent>
            <form action="#" @submit.prevent="updateObjective">
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                        <textarea type="text" name="description" id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editObjective.description" placeholder="Descrição"/>
                        <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.description.$error">
                            {{ "Nome obrigatório!" }}</p>
                    </div>
                    <div class="w-full">
                        <label for="numeration" class="block mb-2 text-sm font-medium text-gray-900">Numeração Objetivo</label>
                        <input type="number" name="numeration" id="numeration"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editObjective.numeration" placeholder="Objetivo" readonly>
                        <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.numeration.$error">
                            {{ "Numeração é obrigatória!" }}
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="guideline" class="block mb-2 text-sm font-medium text-gray-900 ">Diretriz
                            referente</label>
                        <select id="guideline" v-model="guidelineSelected"
                            class=" w-full truncate w-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                            <option selected :value=0>Selecione a Diretriz</option>
                            <option v-for="(guideline, index) in dataGuidelines" :value="guideline.id">{{ guideline.numeration}}</option>
                        </select>
             
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <button type="submit"
                        class=" w-1/2 bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        Atualizar
                    </button>
                    <button type="button" @click="closeModal"
                        class=" w-1/2 text-red-600 items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Cancelar
                    </button>
                </div>
            </form>
        </ModalCardComponent>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";
import Loading from '@/components/Loading.vue';
import InputSearch from '@/components/InputSearch.vue';
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue'
import Container from '@/components/Container.vue'
import Title from '@/components/Title.vue'
import useModalToggle from '@/composables/useModalToggle'
import DefaultLayout from '@/components/DefaultLayout.vue';
import closeModal from "@/composables/cancelModal";
import useGuidelinesList from '@/composables/useGuidelinesList';
import {type  Objective } from '@/types/objective';
import useObjectivesList from '@/composables/useObjectivesList';



const editObjective = ref<Objective>({
    id: 0,
    numeration:0,
    description: '',
    id_guideline:0,

})

const guidelineSelected = ref(0)
const searchDescription = ref('')
const { isOpenModal } = useModalToggle()
const rules = computed(() => {
    return {
        description: { required },
        numeration:{required}
    }
})

const v$ = useVuelidate(rules, editObjective)


const filteredObjectives = computed(() => {
    let objectives = dataObjectives.value
    console.log(dataObjectives.value)

    if (searchDescription.value !== '') {
        objectives = objectives.filter(item => item.description.toLowerCase().includes(searchDescription.value.toLowerCase()))
    }

    return objectives
})

const openEditModal = (data: any) => {
    isOpenModal.value = true
    editObjective.value = data
}


const updateObjective = async () => {
    const result = await v$.value.$validate()
    if (result) {
        await axiosInstance.put(`/api/objectives/${editObjective.value.id}`,
            {
                description: editObjective.value.description,
                numeration: editObjective.value.numeration,

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Diretriz editado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao atualizar Diretriz!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao atualizar Diretriz!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

const deleleObjective = async (data: any) => {

    Swal.fire({
        title: "Você tem certeza?",
        text: "Você perderá todas informações relacionadas a  este Objetivo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SIM, Deletar!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosInstance.delete(`/api/objectives/${data.id}`)
                .then(response => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    dataObjectives.value = dataObjectives.value.filter(item=> item.id !== data.id)
                })
                .catch(error => {
                    Swal.fire({
                        title: "Eroor!",
                        text: "Ocorreu um error ao Deletar!.",
                        icon: "warning"
                    });
                });
        } else {
            Swal.fire({
                title: "Cancelado!",
                text: "Seu dado está seguro :)",
                icon: "error"
            });
        }
    });

}



const { dataObjectives, isload } = useObjectivesList()
const { dataGuidelines } = useGuidelinesList()

</script>


<style scoped>
.modal {
    transition: opacity 0.25s ease;
}
</style>