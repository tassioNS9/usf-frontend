<template>
    <DefaultLayout>
        <div class="mt-1 mx-auto rounded-3xl  p-4">
            <CardComponent>
                <h3 class="text-xl font-bold text-indigo-700">
                    Lista de Unidades
                </h3>
            </CardComponent>

            <Loading v-if="isload" />
            <div class="relative overflow-x-auto shadow-md bg-white sm:rounded-lg" v-else>
                <div
                    class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form class="flex items-center">
                            <InputSearch v-model="searchUnit" />
                        </form>
                    </div>

                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Unidade Médica
                            </th>
                            <th scope="col" class="px-6 py-3 ">
                                Endereço
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Cidade
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Editar</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredUnits.length > 0" class="bg-white border-b hover:bg-gray-50 "
                            v-for="(unit, index) in filteredUnits" :key="unit.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ unit?.name }}
                            </th>
                            <td class="px-6 py-4 ">
                                {{ unit.address }}
                            </td>
                            <td class="px-6 py-4">
                                {{ unit.city }}
                            </td>
                            <td class="px-6 py-4">
                                {{ unit.state }}
                            </td>
                            <td class="flex gap-1 px-6 py-4 text-right justify-between items-center ">
                                <p class="font-medium text-blue-600  hover:cursor-pointer hover:underline"
                                    @click="openEditModal(unit)">
                                    Editar</p>
                                <p @click="deleteUnit(unit)">
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

                        <tr class="flex w-full justify-center border-b  hover:bg-gray-200" v-else>
                            <td class=" py-6 ">Unidade Não Encontrada!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <ModalCardComponent>
            <CardComponent>
                <Title text="Atualizar Unidade" />
            </CardComponent>
            <form action="post" @submit.prevent="updateUnit">
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div class="sm:col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nome da
                            Unidade</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            v-model="editUnit.name" placeholder="Type product name">
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.name.$error">
                            {{ "Nome obrigatório!" }}
                        </p>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                        <input type="text" name="address" id="address" v-model="editUnit.address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.address.$error">
                            {{ "Endereço obrigatório!" }}</p>
                    </div>
                    <div class="w-full">
                        <label for="city" class="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                        <input type="text" name="city" id="city" v-model="editUnit.city"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Cidade">
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.city.$error">
                            {{ "Campo obrigatório!" }}
                        </p>
                    </div>
                    <div class="w-full">
                        <label for="state" class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
                        <select id="state" name="state" autocomplete="state-name" v-model="editUnit.state"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                            <option v-for="(state, index) in brazilStates" :value="state.name" :key="state.uf">{{
                                state.name }}</option>
                        </select>
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.state.$error">
                            {{ "Campo obrigatório!" }}
                        </p>
                    </div>

                    <div class="w-full">
                        <label for="tel" class="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                        <input type="text" name="tel" id="tel" v-model="editUnit.tel"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Telefone">
                        <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.tel.$error">
                            {{ "Campo Inválido!" }}
                        </p>
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
import { brazilStates } from '@/utils/statesDate'
import { ref, onMounted, reactive, computed } from 'vue'
import useVuelidate from "@vuelidate/core";
import { helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { required, minLength, email } from "@vuelidate/validators";
import { useAuth } from '@/stores/auth';
import { type Unit } from '@/types/unit'
import Loading from '@/components/Loading.vue'
import InputSearch from '@/components/InputSearch.vue';
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue';
import Title from "@/components/Title.vue"
import useModalToggle from '@/composables/useModalToggle';
import useUnitsList from '@/composables/useUnitsList';
import DefaultLayout from '@/components/DefaultLayout.vue';
import closeModal from "@/composables/cancelModal";

const authStore = useAuth()

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

const editUnit = ref<Unit>({
    name: '',
    address: '',
    city: '',
    neighborhood: '',
    tel: '',
    state: ''
})

const searchUnit = ref('')
const { isOpenModal } = useModalToggle()
const rules = computed(() => {
    const onlyAlphas = helpers.regex(/^[a-zA-Z]*$/)
    const onlyNumbers = helpers.regex(/^[0-9]*$/)
    return {
        name: { required, onlyAlphas },
        address: { required },
        city: { required, onlyAlphas },
        neighborhood: { required },
        tel:{onlyNumbers},
        state: { required }
    }
})

const v$ = useVuelidate(rules, editUnit)



const filteredUnits = computed(() => {
    let units = dataUnits.value


    if (searchUnit.value !== '') {
        units = units.filter(item => item.name.toLowerCase().includes(searchUnit.value.toLowerCase()))
    }
    return units;
})

const openEditModal = (data: any) => {
    editUnit.value = data
    isOpenModal.value = true
}

const updateUnit = async (e: any) => {
    const result = await v$.value.$validate()
    if (result) {
        await axiosInstance.put(`/api/units/${editUnit.value.id}`,
            {
                name: editUnit.value.name,
                address: editUnit.value.address,
                city: editUnit.value.city,
                state: editUnit.value.state

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Unidade editada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

        }).catch(err => {
            Swal.fire({
                title: 'Erro ao atualizar cadastro!',
                text: 'Algum erro inesperado aconteceu!',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao atualizar cadastro!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

const deleteUnit = async (data: any) => {

Swal.fire({
    title: "Você tem certeza?",
    text: `Você perderá todos os dados relaciondados a esta Unidade`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SIM, Deletar!"
}).then((result) => {
    if (result.isConfirmed) {
        axiosInstance.delete(`/api/units/${data.id}`)
            .then(response => {
                Swal.fire({
                    title: "Deletada!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                dataUnits.value = dataUnits.value.filter(item=> item.id !== data.id)
            }).catch(error => {
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


const { dataUnits, isload } = useUnitsList()

</script>

<style>
.modal {
    transition: opacity 0.25s ease;
}
</style>