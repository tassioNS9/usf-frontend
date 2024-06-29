<template>

    <DefaultLayout>
        <div class="bg-slate-300 rounded-3xl min-h-[600px] p-8 text-cyan-600">
            <section>
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-1">
                    <CardComponent>
                        <h2 class=" text-xl font-bold text-indigo-700">Cadastrar novo usuário</h2>
                    </CardComponent>
                    <form action="post" @submit.prevent="createUser">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">*Nome</label>
                                <input type="text" v-model="data.name" name="name" id="name" autocomplete="given-name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.name.$error">
                                    {{ "Campo Inválido ou nulo!" }}</p>
                            </div>
                            <div class="w-full">
                                <label for="cpf" class="block mb-2 text-sm font-medium text-gray-900">*CPF</label>
                                <input type="text" name="cpf" id="cpf" v-model="data.cpf"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.cpf.$error">
                                    {{ "Campo Inválido ou nulo!" }}</p>
                            </div>
                            <div class="w-full">
                                <label for="office"
                                    class="block mb-2 text-sm font-medium text-gray-900">Cargo/Função</label>
                                <input type="text" name="office" id="office" v-model="data.office"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">

                            </div>


                            <div class="sm:col-span-2">
                                <label for="type_indicator"
                                    class="block text-sm font-medium leading-6 text-gray-900">*Tipo
                                    do Usuário
                                </label>
                                <div class="flex mt-3">
                                    <div class=" sm:col-span-4 flex items-center me-4">
                                        <input id="inline-radio" type="radio" name="inline-radio-group"
                                            :value="Role.USER" v-model="data.role"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                                        <label for="inline-radio"
                                            class="ms-2 text-sm font-medium text-gray-900 ">Padrão</label>
                                    </div>
                                    <div class="flex items-center me-4">
                                        <input id="inline-2-radio" type="radio" name="inline-radio-group"
                                            :value="Role.ADMIN" v-model="data.role"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                                        <label for="inline-2-radio"
                                            class="ms-2 text-sm font-medium text-gray-900 ">Administrador</label>
                                    </div>
                                </div>
                            </div>


                            <div v-if="data.role === 'USER'" class="sm:col-span-2">
                                <label for="unit" class="block mb-2 text-sm font-medium text-gray-900">*Unidade
                                    de
                                    Saúde</label>
                                <select id="unit" name="unit" autocomplete="unit-name" placeholder="escolha a unidade"
                                    v-model="data.id_unit"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option>Selecione uma unidade</option>
                                    <option v-for="(unit, index) in dataUnits" :value="unit.id" :key="unit.id">
                                        {{ unit.name }}</option>
                                </select>
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.id_unit?.$error">
                                {{ "Campo Inválido ou nulo!"}}</p>
                            </div>



                            <div class="w-full">
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900">*Senha</label>
                                <input type="password" name="password" id="password" v-model="data.password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.password.$error">
                                    {{ "Campo Inválido ou nulo!" }}</p>
                            </div>

                            <div class="w-full">
                                <label for="confirmPassword"
                                    class="block mb-2 text-sm font-medium text-gray-900">*Confirmar
                                    Senha</label>
                                <input type="password" name="confirmPassword" id="confirmPassword"
                                    v-model="data.confirmPassword"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.confirmPassword.$error">
                                    {{ "Senhas incompatíveis!" }}</p>
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
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs, maxLength, minValue } from '@vuelidate/validators'
import { helpers } from "@vuelidate/validators";
import axiosInstance from '@/services/api';
import Swal from 'sweetalert2';
import { type UserRegister } from "@/types/user";
import CardComponent from '@/components/CardComponent.vue'
import DefaultLayout from "@/components/DefaultLayout.vue";
import useUnitsList from "@/composables/useUnitsList";
enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

const data = ref<UserRegister>({
    name: '',
    password: '',
    cpf: '',
    id_unit: null,
    office: '',
    confirmPassword: '',
    role: Role.USER
})

const rules = computed(() => {
    const onlyAlphas = helpers.regex(/^[a-zA-Z]*$/)
    const onlyNumbers = helpers.regex(/^[0-9]*$/)
    if (data.value.role === Role.USER) {
           return {
            name: { required,  onlyAlphas,  minLength: minLength(3) }, // Matches state.firstName
            cpf: { required, onlyNumbers, minLength: minLength(11), maxLength: maxLength(11) }, // Matches state.lastName
            password: { required, minLength: minLength(8) },
            id_unit: { required, minValue:minValue(1) },
            confirmPassword: {
                sameAsPassword: sameAs(data.value.password), // can be a reference to a field or computed property
            }
        }
    } else {
        return {
            name: {required:helpers.regex(/^[a-zA-Z]*$/), onlyAlphas, minLength: minLength(3) }, // Matches state.firstName
            cpf: { required:helpers.regex(/^[0-9]*$/), onlyNumbers, minLength: minLength(11), maxLength: maxLength(11) }, // Matches state.lastName
            password: { required, minLength: minLength(8) },
            confirmPassword: {
                sameAsPassword: sameAs(data.value.password), // can be a reference to a field or computed property
            }
        }

    }

})

watch(data.value, async (newQuestion, oldQuestion) => {
    if(data.value.role === Role.ADMIN){
        data.value.id_unit = null
    }
})


const v$ = useVuelidate(rules, data)

const createUser = async (e: any) => {
    const result = await v$.value.$validate()

    if (result) {
        await axiosInstance.post('/api/users',
            {
                name: data.value.name,
                password: data.value.password,
                cpf: data.value.cpf,
                id_unit: data.value.id_unit,
                office: data.value.office,
                role: data.value.role

            }, {
            headers: { 'Content-Type': 'application/json' },

        }).then(res => {
            Swal.fire({
                title: "OK!",
                text: "Usuário Cadastrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });

        }).catch(err => {
            Swal.fire({
                title: 'Erro ao cadastrar!',
                text: `${err.response.data.message}`,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            console.log(err)
        })
    } else {
        Swal.fire({
            title: 'Erro ao Cadastrar!',
            text: 'Por favor verifique os campos!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }

}

const { dataUnits } = useUnitsList()

</script>

<style scoped></style>