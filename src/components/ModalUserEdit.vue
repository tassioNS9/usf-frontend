<template>

  <ModalCardComponent>
    <CardComponent>
      <h2 class="text-xl font-bold text-indigo-700 ">Atualizar Usuário</h2>
    </CardComponent>
    <form action="#" @submit.prevent="updateUser">
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <div class="sm:col-span-2">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Nome</label>
          <input type="text" name="name" id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            v-model="userEdit.name" placeholder="Nome Usuário">
          <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.name.$error">
            {{ "Nome obrigatório!" }}</p>
        </div>
        <div class="w-full">
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 ">CPF</label>
          <input type="text" name="cpf" id="cpf"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            v-model="userEdit.cpf" placeholder="CPF" readonly>
          <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.cpf.$error">
            {{ "CPF obrigatório!" }}
          </p>
        </div>
        <div class="w-full">
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 ">Cargo</label>
          <input type="text" name="cargo" id="brand"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            v-model="userEdit.office" placeholder="Cargo">
          <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.office.$error">
            {{ "Cargo obrigatório!" }}</p>
        </div>
        <div class="w-full">
          <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 ">Unidade
            Referente</label>
          <select id="unit" v-model="userEdit.id_unit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
            <option v-for="(unit, index) in dataUnits" :value="unit.id">{{ unit.name }}</option>
          </select>
          <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.id_unit.$error">
            {{ "Unidade Obrigatória!" }}</p>
        </div>

        <div class="w-full">
          <label for="type_indicator" class="block mb-2 text-sm font-medium text-gray-900 ">Tipo
            do Usuário
          </label>
          <div class="flex mt-4">
            <div class=" sm:col-span-2 flex items-center me-4">
              <input id="inline-radio" type="radio" name="inline-radio-group" :value="Role.USER" v-model="userEdit.role"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
              <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900">Padrão</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-2-radio" type="radio" name="inline-radio-group" :value="Role.ADMIN"
                v-model="userEdit.role"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
              <label for="inline-2-radio"
                class="ms-2 text-sm font-medium text-gray-900">Admin</label>
            </div>
          </div>
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
</template>


<script setup lang="ts">
import axiosInstance from '@/services/api';
import { ref, computed, defineProps, onMounted } from 'vue'
import { type User } from "@/types/user";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Swal from 'sweetalert2';
import useUnitsList from '@/composables/useUnitsList';
import CardComponent from './CardComponent.vue';
import ModalCardComponent from './ModalCardComponent.vue';
import useModalToggle from '@/composables/useModalToggle';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

const {isOpenModal} = useModalToggle()


const userEdit = ref<User>({
  id: 0,
  name: '',
  password: '',
  cpf: '',
  id_unit: 0,
  office: '',
  role: Role.USER
})

const rules = computed(() => {
  return {
    name: { required },
    cpf: { required },
    office: { required },
    id_unit: { required }
  }
})

const cancelEdit = () => {
  isOpenModal.value = false
}


const v$ = useVuelidate(rules, userEdit)


const updateUser = async (e: any) => {
  const result = await v$.value.$validate()
  if (result) {
    await axiosInstance.put(`/api/users/${userEdit.value.id}`,
      {
        name: userEdit.value.name,
        cpf: userEdit.value.cpf,
        office: userEdit.value.office,
        id_unit: userEdit.value.id_unit,
        password: userEdit.value.password,
        role: userEdit.value.role

      }, {
      headers: { 'Content-Type': 'application/json' },

    }).then(res => {
      Swal.fire({
        title: "OK!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }).catch(err => {
      Swal.fire({
        title: 'Oops!',
        text: 'Algum erro inesperado aconteceu!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    })
  } else {
    Swal.fire({
      title: 'Erro ao atualizar!',
      text: 'Por favor verifique os campos!',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
}

const { dataUnits } = useUnitsList()


</script>