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
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <InputSearch v-model="searchDescription" />
                    </form>
                </div>
                <div class="flex">
                    <div class="flex items-center me-4">
                        <label for="inline-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">Filtrar:</label>
                    </div>
                    <div class="flex items-center me-4">
                        <input id="inline-radio" type="radio" value="" name="inline-radio-group"
                            v-model="typeIndicator"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                        <label for="inline-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">Todos</label>
                    </div>
                    <div class="flex items-center me-4">
                        <input id="inline-radio" type="radio" value="NUMERIC" name="inline-radio-group"
                            v-model="typeIndicator"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                        <label for="inline-radio"
                            class="ms-2 text-sm font-medium text-gray-900 ">NUMÉRICO</label>
                    </div>
                    <div class="flex items-center me-4">
                        <input id="inline-2-radio" type="radio" value="BOOL" name="inline-radio-group"
                            v-model="typeIndicator"
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
                        <td @click="openEditModal(indicator)" class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600  hover:underline">Editar</a>
                        </td>
                    </tr>

                    <tr class="flex w-full justify-center border-b  hover:bg-gray-400" v-else ><td class=" py-6 ">Indicador Não Encontrado!</td></tr>
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
                    <label for="description"
                        class="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
                    <input type="text" name="description" id="description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        v-model="editIndicator.description" placeholder="Descrição">
                    <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.description.$error">
                        {{ "Nome obrigatório!" }}</p>
                </div>
                <div class="w-full">
                    <label for="objective"
                        class="block mb-2 text-sm font-medium text-gray-900">Objetivo</label>
                    <input type="text" name="objective" id="objective"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        v-model="editIndicator.objective" placeholder="Objetivo" readonly>
                    <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.objective.$error">
                        {{ v$.cpf.$errors[0].$params.type === 'required' ? "CPF obrigatório!" : "CPF inválido!" }}
                    </p>
                </div>
                <div class="w-full">
                    <label for="brand"
                        class="block mb-2 text-sm font-medium text-gray-900">Dimensão</label>
                    <input type="text" name="cargo" id="brand"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        v-model="editIndicator.dimension" placeholder="Dimensão">
                    <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.dimension.$error">
                        {{ "Cargo obrigatório!" }}</p>
                </div>

                <div class="w-full">
                    <label for="sources"
                        class="block mb-2 text-sm font-medium text-gray-900">Fontes</label>
                    <input type="text" name="sources" id="sources"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        v-model="editIndicator.sources" placeholder="Fontes">
                    <p class="px-2 mt-2 text-xs text-red-600 " v-if="v$.sources.$error">
                        {{ "Cargo obrigatório!" }}</p>
                </div>
            </div>


            <div class="flex items-center space-x-4">
                <button type="submit"
                    class=" bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Atualizar
                </button>
                <button type="button" @click="cancelEdit()"
                    class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Cancelar
                </button>
            </div>
        </form>
    </ModalCardComponent>
</DefaultLayout>
</template>

<script setup lang="ts">
import axiosInstance from '@/services/api'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";
import Loading from '@/components/Loading.vue';
import { type Indicator } from '@/types/user'
import InputSearch from '@/components/InputSearch.vue';
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue'
import Container from '@/components/Container.vue'
import Title from '@/components/Title.vue'
import useIndicatorsList from '@/composables/useIndicatorsList';
import useModalToggle from '@/composables/useModalToggle'
import DefaultLayout from '@/components/DefaultLayout.vue';
import cancelEdit from "@/composables/cancelModal";
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
        indicators = indicators.filter(item => item.description.includes(searchDescription.value))
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

const { dataIndicators, isload } = useIndicatorsList()


</script>


<style scoped>
.modal {
    transition: opacity 0.25s ease;
}
</style>