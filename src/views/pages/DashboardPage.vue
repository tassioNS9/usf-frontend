<template>

<DefaultLayout>
<Container>
      <div class="flex flex-col">
        <CardComponent>
          <h3 class=" text-xl font-bold text-indigo-700 ">
            Dashboard
          </h3>
        </CardComponent>
        <Loading v-if="isload" />
        
        <div v-else class="flex mt-4 flex-wrap gap-2 w-full justify-between">
          <div class="w-full md:w-1/4 flex flex-col   gap-2">
            <label for="year" class=" w-1/2 px-2 text-gray-900"> Selecionar Ano
            </label>
            <select id="year" v-model="yearSelected"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected :value=2024>2024</option>
              <option :value=2023>2023</option>
            </select>
          </div>

          <div v-if="auth.role === 'ADMIN'" class="w-full md:w-1/3 flex flex-col  gap-2">
            <label for="units" class=" w-2/3 px-2 text-gray-900">Selecionar Unidade
            </label>
            <select id="units" v-model="unitSelected"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>Selecione a Unidade</option>
              <option v-for="unit in dataUnits " :key="unit.id" :value=unit.id>{{ unit.name }}</option>
            </select>
          </div>
        

        </div>
      </div>
      <div v-if="!isload" class="flex flex-wrap items-center justify-center  mx-3 my-6 gap-5">
        <template v-for="indicator in dataIndicators" :key="indicator.id">
          <CreateChart :yearSelected="yearSelected" :evaluations="indicator.evaluations"
            :description-data="indicator.description" />
        </template>
      </div>
    </Container>
  </DefaultLayout>
</template>


<script setup lang="ts">
import CreateChart from '@/components/CreateChart.vue';
import { ref, onMounted, watch } from 'vue'
import { useAuth } from "@/stores/auth";
import axiosInstance from '@/services/api'
import CardComponent from '@/components/CardComponent.vue'
import Container from '@/components/Container.vue'
import Loading from '@/components/Loading.vue';
import useUnitsList from '@/composables/useUnitsList';
import DefaultLayout from '@/components/DefaultLayout.vue';
import {type IndicatorList} from '@/types/indicators'

const dataIndicators = ref<IndicatorList[]>([])
  const auth = useAuth()
const yearSelected = ref(2024)
const unitSelected = ref(auth.userAuthetincated.id_unit ??  1)


axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token

watch(yearSelected, (newQuestion, oldQuestion) => {
  getFilteredEvaluations()

})

watch(unitSelected, (newQuestion, oldQuestion) => {
  getFilteredEvaluations()

})
const getFilteredEvaluations = async () => {

  await axiosInstance.get(`/api/indicators-numerics/${unitSelected.value}/${yearSelected.value}`).then(response => {
    (dataIndicators.value = response.data.data)
    //descriptionIndicator.value = response?.data?.data[0]?.indicator.description
  }).catch(error => {
    console.log(error)
  })
}


const {dataUnits,isload} = useUnitsList()

onMounted(() => {
  getFilteredEvaluations()
})

</script>

<style scoped></style>