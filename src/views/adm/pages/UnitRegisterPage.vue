<template>
    <DefaultLayout>
        <section class="bg-slate-300  rounded-3xl  p-8 text-cyan-600">
            <div class="max-w-3xl mx-auto px-4 py-8  lg:py-1">
                <CardComponent>
                    <h2 class=" text-xl font-bold text-indigo-700">CADASTRAR NOVA UNIDADE</h2>
                </CardComponent>
                <form action="post" @submit.prevent="createUnit">
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div class="sm:col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">*Nome</label>
                            <input type="text" v-model="data.name" name="name" id="name" autocomplete="given-name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.name.$error">
                                <!-- {{ v$.name.$errors[0].$params.type === 'required' ? "Campo obrigatório!" : "Nome inválido!"}}</p> -->
                                {{ "Campo inválido ou nulo" }}
                            </p>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900">*Endereco</label>
                            <input type="text" name="cpf" id="cpf" v-model="data.address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.address.$error">
                                {{ "Campo inválido ou nulo" }}</p>
                        </div>
                        <div class="w-full">
                            <label for="office" class="block mb-2 text-sm font-medium text-gray-900">*Cidade</label>
                            <input type="text" name="office" id="office" v-model="data.city"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.city.$error">
                                {{ "Campo inválido ou nulo" }}</p>

                        </div>

                        <div class="w-full">

                            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900">*Estado
                            </label>
                            <select id="state" name="state" autocomplete="state-name" v-model="data.state"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option>Selecione o estado</option>
                                <option v-for="(state, index) in brazilStates" :value="state.name" :key="state.uf">
                                    {{ state.name }}</option>
                            </select>
                            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.state.$error">
                                {{ "Campo inválido ou nulo" }}</p>
                        </div>

                        <div class="w-full">
                            <label for="neighborhood"
                                class="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                            <input type="text" name="neighborhood" id="neighborhood" v-model="data.neighborhood"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">

                        </div>

                        <div class="w-full">
                            <label for="tel" class="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                            <input type="text" name="tel" id="tel" v-model="data.tel"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.tel.$error">
                                    {{ "Campo Inválido!" }}</p>
                            </div>

                    </div>
                    <div class="flex items-center space-x-4 mt-1">
                        <button type="submit"
                            class=" w-full lg:w-1/4 bg-indigo-700 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-indigo-800">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axiosInstance from '@/services/api';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { helpers } from "@vuelidate/validators";
import { brazilStates } from "@/utils/statesDate";
import Swal from 'sweetalert2';

import CardComponent from '@/components/CardComponent.vue'
import { type Unit } from '@/types/unit'
import DefaultLayout from "@/components/DefaultLayout.vue";

const data = ref<Unit>({
    name: '',
    tel: '',
    address: '',
    state: '',
    city: '',
    neighborhood: ''

})

const rules = computed(() => {
    const onlyAlphas = helpers.regex(/^[a-zA-Z]*$/)
    const onlyNumbers = helpers.regex(/^[0-9]*$/)
    return {
        name: { required, onlyAlphas, minLength: minLength(3) }, // Matches state.firstName
        address: { required, minLength: minLength(8) },
        city: { required },
        state: { required },
        tel:{onlyNumbers, maxLength:maxLength(11)}
    }
})

const v$ = useVuelidate(rules, data)

const createUnit = async (e: any) => {
    const result = await v$.value.$validate()

    if (result) {
        axiosInstance.post('/api/units',
            {
                name: data.value.name,
                tel: data.value.tel,
                address: data.value.address,
                state: data.value.state,
                city: data.value.city,
                neighborhood: data.value.neighborhood


            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Unidade cadastrada com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

        }).catch(err => {
            Swal.fire({
                title: 'Erro ao Cadastar!',
                text: `${err.data.message}`,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao Cadastar!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

</script>

<style scoped></style>