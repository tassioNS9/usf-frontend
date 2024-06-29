<template>
    <DefaultLayout>
        <Container>
            <CardComponent>
                <h3 class="text-xl font-bold text-indigo-700">
                    Lista de Indicadores
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

                        <tr v-if="filteredIndicators.length > 0" class="bg-white border-b   hover:bg-gray-50 "
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
                            <td class="flex gap-2 px-6 py-4 text-right justify-between items-center ">
                                <p class="font-medium text-blue-600  hover:cursor-pointer hover:underline"
                                    @click="openEditModal(indicator)">
                                    Editar</p>
                                <p @click="deleleIndicator(indicator)">
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
                            <td class=" py-6 ">Indicador Não Encontrado!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>

        <ModalCardComponent>
            <CardComponent>
                <Title text="Atualizar Indicador" />
            </CardComponent>
            <form action="#" @submit.prevent="updateIndicator">
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                        <input type="text" name="description" id="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editIndicator.description" placeholder="Descrição">
                        <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.description.$error">
                            {{ "Nome obrigatório!" }}</p>
                    </div>
                    <div class="w-full">
                        <label for="objective" class="block mb-2 text-sm font-medium text-gray-900">Objetivo</label>
                        <input type="text" name="objective" id="objective"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editIndicator.objective" placeholder="Objetivo" readonly>
                        <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.objective.$error">
                            {{ v$.cpf.$errors[0].$params.type === 'required' ? "CPF obrigatório!" : "CPF inválido!" }}
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Dimensão</label>
                        <input type="text" name="cargo" id="brand"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editIndicator.dimension" placeholder="Dimensão">
                        <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.dimension.$error">
                            {{ "Cargo obrigatório!" }}</p>
                    </div>

                    <div class="w-full">
                        <label for="sources" class="block mb-2 text-sm font-medium text-gray-900">Fontes</label>
                        <input type="text" name="sources" id="sources"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editIndicator.sources" placeholder="Fontes">
                        <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.sources.$error">
                            {{ "Cargo obrigatório!" }}</p>
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
    </DefaultLayout>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, onUpdated, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";
import Loading from '@/components/Loading.vue';
import { type Indicator } from '@/types/indicators'
import InputSearch from '@/components/InputSearch.vue';
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue'
import Container from '@/components/Container.vue'
import Title from '@/components/Title.vue'
import useIndicatorsList from '@/composables/useIndicatorsList';
import useModalToggle from '@/composables/useModalToggle'
import DefaultLayout from '@/components/DefaultLayout.vue';
import closeModal from "@/composables/cancelModal";

const editIndicator = ref<Indicator>({
    id: 0,
    description: '',
    objective: 0,
    dimension: '',
    type_Indicator: '',
    sources: '',
})
const searchDescription = ref('')
const { isOpenModal } = useModalToggle()
const typeIndicator = ref('')
const rules = computed(() => {
    return {
        description: { required },
        objective: { required },
        dimension: { required },
        type_Indicator: { required },
        sources: { required }
    }
})

const v$ = useVuelidate(rules, editIndicator)


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

const openEditModal = (data: any) => {
    isOpenModal.value = true
    editIndicator.value = data
}


const updateIndicator = async () => {
    const result = await v$.value.$validate()
    if (result) {
        await axiosInstance.put(`/api/indicators/${editIndicator.value.id}`,
            {
                description: editIndicator.value.description,
                objective: editIndicator.value.objective,
                type_indicator: editIndicator.value.type_Indicator,
                dimension: editIndicator.value.dimension,
                sources: editIndicator.value.sources

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Indicador editado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }).catch(err => {
            Swal.fire({
                title: 'Erro ao atualizar Indicador!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao atualizar Indicador!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

const deleleIndicator = async (data: any) => {

    Swal.fire({
        title: "Você tem certeza?",
        text: "Você perderá todas informações relacionadas a este Indicador!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SIM, Deletar!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosInstance.delete(`/api/indicators/${data.id}`)
                .then(response => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    dataIndicators.value = dataIndicators.value.filter(item=> item.id !== data.id)
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



const { dataIndicators, isload } = useIndicatorsList()


</script>


<style scoped>
.modal {
    transition: opacity 0.25s ease;
}
</style>