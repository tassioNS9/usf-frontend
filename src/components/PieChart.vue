<template>

    <div id="chart">
        <apexchart type="pie" width="280" height="180" :options="dataPie.chartOptions" :series="dataPie.series">
        </apexchart>
    </div>
    
</template>


<script setup>
import { ref } from 'vue'
import { useAuth } from "@/stores/auth";


const dataPie = ref({
    series: [45, 55],
    chartOptions: {
        chart: {
            width: 180,
            type: 'pie',
        },
        labels: ['Team A', 'Team B'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 100
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    },
})

//const auth = useAuth();
</script>

<style scoped></style>