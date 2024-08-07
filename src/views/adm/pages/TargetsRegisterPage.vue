<template>
    <DefaultLayout>
        <div class="bg-slate-300 rounded-3xl min-h-[600px] p-8 text-cyan-600">

            <div class="w-full gap-10 flex items-center justify-center mb-8">
                <button @click="selectForm(0)" type="button" :class="`py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none ${selectedForm === 0 ? 'bg-gray-500 text-purple-800' : ' bg-white text-gray-900' }  rounded-full border border-gray-200 hover:bg-gray-500 hover:text-purple-800`">Registar Diretriz</button>
                <button @click="selectForm(1)" type="button" :class="`py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none ${selectedForm === 1 ? 'bg-gray-500 text-purple-800' : ' bg-white text-gray-900' }  rounded-full border border-gray-200 hover:bg-gray-500 hover:text-purple-800`">Registar Objetivo</button>
            </div>
            <GuidelineRegister v-if="selectedForm === 0"/>
            <ObjectiveRegister v-else/> 
        </div>

    </DefaultLayout>
</template>



<script setup lang="ts">
import DefaultLayout from "@/components/DefaultLayout.vue";
import GuidelineRegister from "../components/GuidelineRegister.vue";
import ObjectiveRegister from "../components/ObjectiveRegister.vue";
import { ref } from "vue";

const selectedForm = ref(0)


const selectForm =(value:number) =>{
    selectedForm.value = value

    
}

</script>