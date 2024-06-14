<template>
    <div class="bg-white relative border rounded-lg">
    <div class="flex items-center justify-between">
        <SearchForm @search="handleSearch"/>
    </div>

    <div class="flex items-center justify-end text-sm font-semibold">
        <filterRadios @filter="handleRadioFilter"/>

        <FilterDropdown :items="items" @filter="handleCheckboxFilter"/>
    </div>
 
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">
                    <span class="sr-only">Actions</span>
                </th>
            </tr>
     
    </thead>
    <tbody>
        <tr v-for="item in filteredItems" :key="item.id" class="border-b">
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.user.name }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.status }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.title }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.due_at }}</td>
            <td class="px-4 py-3 flex items-center justify-end">
                <a href="" class="text-indigo-500 hover:underline">Details</a>
            </td>
        </tr>
    </tbody>
    </table>
</div>
</template>


<script setup>
import {defineProps, computed,ref} from 'vue';
import SearchForm from './SearchForm.vue';
import FilterRadios from './FilterRadios.vue';
import FilterDropdown from './FilterDropdown.vue';

const searchFilter = ref('')
const radioFilter = ref('')
const statusesFilter = ref([])

const props = defineProps({
    items:{
        type:Array,
        required:true
    }
})

const filteredItems = computed(()=>{
    let items = props.items;
    switch(radioFilter.value){
        case 'today':
            items = items.filter(item => new Date(item.due_at).getDate()=== new Date().getDate())
        break;

        case 'past':
        items = items.filter(item => new Date(item.due_at).getDate() < new Date())
        break;

    }
    if(statusesFilter.value.length){
        items = items.filter(item=> statusesFilter.value.includes(item.status))
    }


    if(searchFilter.value !== ''){
        items = items.filter(item=>item.title.includes(searchFilter.value) || item.user.name.includes(searchFilter.value));
    }
    return items;
})

const handleSearch = (search)=>{
    searchFilter.value = search;
}

const handleRadioFilter = (filter)=>{
    radioFilter.value = filter;
}

const handleCheckboxFilter = (filter)=>{
    if(searchFilter.value.includes(filter)){
        return statusesFilter.value.splice(statusesFilter.value.indexOf(filter), 1)
    }

    return statusesFilter.value.push(filter)

}

</script>