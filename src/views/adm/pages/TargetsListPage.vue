<template>
    <DefaultLayout>
        <div class="w-full gap-10 flex items-center justify-center mb-5">
                <button @click="selectList(0)" type="button" :class="`py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none ${selectedList === 0 ? 'bg-gray-500 text-purple-800' : ' bg-white text-gray-900' }  rounded-full border border-gray-200 hover:bg-gray-500 hover:text-purple-800`">Diretrizes</button>
                <button @click="selectList(1)" type="button" :class="`py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none ${selectedList === 1 ? 'bg-gray-500 text-purple-800' : ' bg-white text-gray-900' }  rounded-full border border-gray-200 hover:bg-gray-500 hover:text-purple-800`">Objetivos</button>
            </div>
        <GuidelineList v-if="selectedList === 0"/>
        <ObjectiveList v-else-if="selectedList === 1"/>

    </DefaultLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import DefaultLayout from '@/components/DefaultLayout.vue';
  import GuidelineList from '../components/GuidelineList.vue';
  import ObjectiveList from '../components/ObjectiveList.vue';
  
  const selectedList = ref(0)


const selectList =(value:number) =>{
    selectedList.value = value

    
}
  </script>