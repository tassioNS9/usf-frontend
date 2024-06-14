<template>
    <ModalCardComponent>
        <div class="min-w-[250px] px-4 py-8 mx-auto lg:py-16">
            <CardComponent>
                    <h2 class="mb-4 text-xl font-bold text-indigo-700 ">Atualizar Unidade</h2>
                </CardComponent>
                    <form action="post" @submit.prevent="updateUnit">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Nome da
                                    Unidade</label>
                                <input type="text" name="name" id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    v-model="editUnit.name" placeholder="Type product name">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.name.$error">
                                    {{ v$.name.$errors[0].$params.type === 'required' ? "Nome obrigatório!" : "Email inválido!"}}</p>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="address"
                                    class="block mb-2 text-sm font-medium text-gray-900 ">Endereço</label>
                                <input type="text" name="address" id="address" v-model="editUnit.address"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.address.$error">
                                    {{ v$.address.$errors[0].$params.type === 'required' ? "Endereço obrigatório!" : "Email inválido!" }}</p>
                            </div>
                            <div class="w-full">
                                <label for="city" class="block mb-2 text-sm font-medium text-gray-900 ">Cidade</label>
                                <input type="text" name="city" id="city" v-model="editUnit.city"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Cidade">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.city.$error">
                                    {{ v$.city.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Email inválido!" }}</p>
                            </div>
                            <div class="w-full">
                                <label for="state" class="block mb-2 text-sm font-medium text-gray-900 ">Estado</label>
                                <select id="state" name="state" autocomplete="state-name" v-model="editUnit.state"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                    <option v-for="(state, index) in brazilStates" :value="state.name" :key="state.uf">
                                        {{ state.name }}</option>
                                </select>
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.state.$error">
                                    {{ v$.state.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Email inválido!" }}</p>
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
                </div>

    </ModalCardComponent>

</template>

<script setup>
import { brazilStates } from '@/utils/statesDate'
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import { ref } from 'vue'
import { required, minLength, email } from "@vuelidate/validators";
import ModalCardComponent from './ModalCardComponent.vue';
import CardComponent from './CardComponent.vue';
const openModal = ref(false)

const editUnit = ref < Unit > ({
    id: 0,
    name: '',
    address: '',
    city: '',
    neighborhood: '',
    tel: '',
    state: ''
})



const rules = computed(() => {
    return {
        name: { required },
        address: { required },
        city: { required },
        neighborhood: { required },
        state: { required }
    }
})

const v$ = useVuelidate(rules, editUnit)

</script>


<style>
.modal {
    transition: opacity 0.25s ease;
}
</style>