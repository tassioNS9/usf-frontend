<template>
    <DefaultLayout>
        <Container>
            <CardComponent>
                <h3 class="text-xl font-bold text-indigo-700">
                    AVALIAÇÕES DO INDICADOR
                </h3>
            </CardComponent>

            <Loading v-if="isload" />

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white" v-else>
                <div
                    class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
               
                    <select id="year" v-model="yearSelected"
                        class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                        <option :value=2024>2024</option>
                        <option :value=2023>2023</option>
                    </select>

                    
                    <select v-if="auth.userAuthetincated.role === 'MANAGER'" id="unit" v-model="unitSelected"
                        class="w-[250px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                        <option v-for="(unit, index) in dataUnits" :value="unit.id" :key="unit.id">{{
                                unit.name }}</option>
  
                    </select>

                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Avaliador(a)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Valor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Mês da Avaliação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b  hover:bg-gray-50" v-for="(evaluation, index) in filteredEvaluations"
                            :key="evaluation.id">
                            <td class="px-6 py-4">
                                {{ evaluation?.evaluator }}
                            </td>
                            <td class="px-6 py-4">
                                {{ evaluation.valueBol === null ? evaluation.valueNum :
                                    formatTypeBol(evaluation.valueBol)
                                }}
                            </td>
                            <td class="px-6 py-4">
                                {{ formatData(evaluation.date_evaluation.toString()) }}
                            </td>
                            <td v-if="auth.userAuthetincated.role !== 'MANAGER'" class="flex gap-4 px-6 py-4  justify-center items-center ">
                                <p class="font-medium text-blue-600  hover:cursor-pointer hover:underline"
                                    >
                                    Editar</p>
                                <p @click="deleteEvaluation(evaluation.id)">
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
                    </tbody>
                </table>
                <!-- <NavPage /> -->
            </div>
        </Container>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import Container from '@/components/Container.vue'
import { formatTypeBol } from '@/utils/formatTypeBol';
import { formatData, getFullYearDate } from '@/utils/formatDate'
import axiosInstance from '@/services/api'
import Loading from '@/components/Loading.vue';
import useUnitsList from '@/composables/useUnitsList';
import { type Evaluation } from '@/types/evaluations'
import { useAuth } from '@/stores/auth';
import DefaultLayout from '@/components/DefaultLayout.vue';
import Swal from 'sweetalert2';

const auth = useAuth();
const unitSelected = ref(auth.userAuthetincated.id_unit ?? 1)
const yearSelected = ref(2024)
const isload = ref(true)
const dataEvaluations = ref<Evaluation[]>([])
import { useRoute } from 'vue-router';

const router = useRoute()
const id = router.params.id
console.log(auth.userAuthetincated, 'user')


const filteredEvaluations = computed(() => {
    let evaluations = dataEvaluations.value

        evaluations = evaluations.filter(item => getFullYearDate(item.date_evaluation) === yearSelected.value)
    
    return evaluations;
})


const getEvaluationsByIndicator = async () => {
    isload.value = true
    await axiosInstance.get(`/api/evaluations/unit/${unitSelected.value}/indicator/${id}`).then(
        response => (dataEvaluations.value = response.data.data))
        .catch((error) => {
            console.log(error);
        });
    isload.value = false
}

watch(unitSelected, (newQuestion, oldQuestion) => {
    getEvaluationsByIndicator()
}, { deep: true })


const deleteEvaluation = async (idEvaluation: number | undefined) => {

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
            axiosInstance.delete(`api/evaluations/${idEvaluation}`)
                .then(response => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    dataEvaluations.value = dataEvaluations.value.filter(item=> item.id !== idEvaluation)
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

onMounted(() => {
    getEvaluationsByIndicator()
})

const { dataUnits } = useUnitsList()

</script>