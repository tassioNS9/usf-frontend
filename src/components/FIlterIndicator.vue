<template>
<div class="w-full md:w-1/4 flex flex-row justify-center items-center gap-3">
                    <label for="indicators" class=" text-sm font-medium text-gray-900 ">Filtrar Indicador:
                    </label>
                    <select id="indicators" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option :value=0>Todos</option>
                        <option :value=1>INDICADOR 1</option>
                        <option :value=2>INDICADOR 2</option>
                    </select>
                </div>
</template>