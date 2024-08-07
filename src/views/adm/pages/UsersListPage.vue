<template>

  <DefaultLayout>
    <Container>
      <CardComponent>
        <h3 class="text-xl font-bold text-indigo-700 ">
          LISTA DE USUÁRIOS
        </h3>
      </CardComponent>
      <Loading v-if="isload" />
      <div class="relative max-h-[70vh] overflow-x-auto  shadow-md sm:rounded-lg bg-white" v-else>
        <div class="flex flex-col md:flex-row  items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <InputSearch v-model="searchName" />
            </form>
          </div>
          <div class="flex">
            <div class="flex items-center me-4">
              <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900">Filtrar:</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-radio" type="radio" value="" name="inline-radio-group" v-model="typeUserSelected"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
              <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900">Todos</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-radio" type="radio" :value="Role.USER" name="inline-radio-group"
                v-model="typeUserSelected"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
              <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900">Padrão</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-2-radio" type="radio" :value="Role.ADMIN" name="inline-radio-group"
                v-model="typeUserSelected"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
              <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900">ADM</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-2-radio" type="radio" :value="Role.DIRECTOR" name="inline-radio-group"
                v-model="typeUserSelected"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
              <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900">Diretor</label>
            </div>
            <div class="flex items-center me-4">
              <input id="inline-2-radio" type="radio" :value="Role.MANAGER" name="inline-radio-group"
                v-model="typeUserSelected"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
              <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900">Gestor</label>
            </div>
          </div>
          <div class="flex items-center">
            <select id="unit" v-model="unitSelected"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
              <option :value="0">Todas Unidades</option>
              <option v-for="(unit, index) in dataUnits" :value="unit.id">{{ unit.name }}</option>
            </select>
          </div>
        </div>
        <table class="w-full  text-sm text-left rtl:text-right text-gray-500 ">

          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nome
              </th>
              <th scope="col" class="px-6 py-3">
                CPF
              </th>
              <th scope="col" class="px-6 py-3">
                Unidade Referente
              </th>
              <th scope="col" class="px-6 py-3">
                Tipo
              </th>
              <th scope="col" class="px-6 py-3">
                Cargo
              </th>

              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredUsers.length > 0" class="bg-white border-b hover:bg-gray-50 "
              v-for="user in filteredUsers" :key="user.id">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ user?.name }}
              </th>
              <td class="px-6 py-4">
                {{ user?.cpf }}
              </td>
              <td  class="px-6 py-4">
                {{ user.unit !== null ? user.unit?.name : "SEM UNIDADE REFERENTE" }}
              </td>
              <td class="px-6 py-4">
                {{ user.role  }}
              </td>

              <td class="px-6 py-4">
                {{ user.office }}
              </td>
              <td class="flex gap-2 px-6 py-4  justify-between items-center ">
                <p class="font-medium text-blue-600  hover:cursor-pointer hover:underline" @click="openEditModal(user)">
                  Editar</p>
                <p @click="deleteUser(user)">
                  <svg class="w-6 h-6 hover:cursor-pointer text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                  </svg>
                </p>
              </td>
            </tr>

            <tr class="flex w-full justify-center border-b  hover:bg-gray-200" v-else>
              <td class=" py-6 ">Usuário Não Encontrado!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>


    <ModalCardComponent>
      <CardComponent>
        <h2 class="text-xl font-bold text-indigo-700">Atualizar Usuário</h2>
      </CardComponent>
      <form action="#" @submit.prevent="updateUser">
        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div class="sm:col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nome</label>
            <input type="text" name="name" id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              v-model="userEdit.name" placeholder="Nome Usuário">
            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.name.$error">
              {{ "Nome inválido ou nulo!" }}</p>
          </div>
          <div class="w-full">
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">CPF</label>
            <input type="text" name="cpf" id="cpf"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              v-model="userEdit.cpf" placeholder="CPF" readonly>
            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.cpf.$error">
              {{ "CPF inválido ou nulo!" }}
            </p>
          </div>
          <div class="w-full">
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Cargo</label>
            <input type="text" name="cargo" id="brand"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              v-model="userEdit.office" placeholder="Cargo">
            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.office.$error">
              {{ "Cargo inválido ou nulo!" }}</p>
          </div>
          <div class="w-full">
            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900">Unidade
              Referente</label>
            <select id="unit" v-model="userEdit.id_unit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
              <option v-for="(unit, index) in dataUnits" :value="unit.id">{{ unit.name }}</option>
            </select>
            <p class="px-2 mt-2 text-xs text-red-600" v-if="v$.id_unit.$error">
              {{ "Campo inválido ou nulo!" }}</p>
          </div>

          <div class="w-full">
            <label for="type_indicator" class="block mb-2 text-sm font-medium text-gray-900">Tipo
              do Usuário
            </label>
            <div class="flex mt-4">
              <div class=" sm:col-span-2 flex items-center me-4">
                <input id="inline-radio" type="radio" name="inline-radio-group" :value="Role.USER"
                  v-model="userEdit.role"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 ">
                <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 ">Padrão</label>
              </div>
              <div class="flex items-center me-4">
                <input id="inline-2-radio" type="radio" name="inline-radio-group" :value="Role.ADMIN"
                  v-model="userEdit.role"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2">
                <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 ">Admin</label>
              </div>
            </div>
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
import axiosInstance from '@/services/api';
import { ref, watch, onMounted, computed } from 'vue'
import InputSearch from '@/components/InputSearch.vue';
import Container from '@/components/Container.vue'
import CardComponent from '@/components/CardComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue';
import useUnitsList from '@/composables/useUnitsList';
import useModalToggle from '@/composables/useModalToggle';
import { type User } from "@/types/user";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { helpers } from '@vuelidate/validators';
import DefaultLayout from '@/components/DefaultLayout.vue';
import Swal from 'sweetalert2';
import closeModal from "@/composables/cancelModal";

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DIRECTOR = 'DIRECTOR'
}

const arrayRole = Object.values(Role)
console.log(arrayRole)

const searchName = ref('')
const unitSelected = ref(0)
const typeUserSelected = ref("")
const { isOpenModal } = useModalToggle()
import { useAuth } from '@/stores/auth';
import Loading from '@/components/Loading.vue';
import useUsersList from '@/composables/useUsersList';
const authStore = useAuth()

axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.token

const userEdit = ref<User>({
  name: '',
  password: '',
  cpf: '',
  id_unit: 0,
  office: '',
  role: Role.USER
})


const filteredUsers = computed(() => {
  let users = dataUsers.value


  if (searchName.value !== '') {
    users = users.filter(item => item.name.toLowerCase().includes(searchName.value.toLowerCase()))
  }

  if (unitSelected.value !== 0) {
    users = users.filter(user => user.id_unit === unitSelected.value)
  }

  if (typeUserSelected.value.length !== 0) {
    users = users.filter(user => user.role === typeUserSelected.value)
  }
  return users;
})


const openEditModal = (data: any) => {
  isOpenModal.value = true
  userEdit.value = data
}


const rules = computed(() => {
  const onlyAlphas = helpers.regex( /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)
  const onlyNumbers = helpers.regex(/^[0-9]*$/)
  return {
    name: { required, onlyAlphas },
    cpf: { required, onlyNumbers },
    office: { required },
    id_unit: { required },
    role: { required }
  }
})


const v$ = useVuelidate(rules, userEdit)


const updateUser = async () => {
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
      console.log(err)
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

const deleteUser = async (data: any) => {

Swal.fire({
    title: "Você tem certeza?",
    text: `Usuário(a) ${data.name} será deletado!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "SIM, Deletar!"
}).then((result) => {
    if (result.isConfirmed) {
        axiosInstance.delete(`/api/users/${data.id}`)
            .then(response => {
                Swal.fire({
                    title: "OK!",
                    text: "Usuário Deletado.",
                    icon: "success"
                });
                dataUsers.value = dataUsers.value.filter(item=> item.id !== data.id)
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

const { dataUsers, isload } = useUsersList()
const { dataUnits } = useUnitsList()

</script>