<template>

    <div id="chart" v-if="props.evaluations.length > 0">
        <apexchart type="line" width="380" height="350" :options="chartOptionsBol" :series="chartOptionsBol.series">
        </apexchart>

        <h3 class="w-[400px] text-center font-bold text-sm text-[#4338ca]">{{ props.descriptionData }}</h3>
    </div>

</template>



<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';
import { type Evaluation } from '@/types/evaluations';
const props = defineProps({
  evaluations: {
    type: Array<Evaluation>,
    required: true,
  },
  descriptionData: {
    type: String,
    required: true
  },
  yearSelected: {
    type: Number,
    required: true
  }
});
const chartOptionsBol = ref({
    chart: {
        type: 'line',
        height: 350
    },
    series: [{
        name: 'Status',
        data: [null, null, null, null, null, null, null, null, null, null, null, null]  // Dados booleanos
    }],
    xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    yaxis: {
        labels: {
            formatter: function (value: any) {
                return value == 1 ? 'Sim' : 'Não';
            }
        },
        tickAmount: 1
    },
    tooltip: {
        y: {
            formatter: function (value: any) {
                return value == 1 ? 'Sim' : 'Não';
            }
        }
    },
})

const isLoading = ref(false)

watch(() => props.evaluations, async (newQuestion, oldQuestion) => {
  await getValuesDashboard()
}, { deep: true }
)

const getMonthofDate = (date: Date) => {
  let newDate = new Date(date)
  return newDate.getMonth()
}


const resetChart = ()=>{
  chartOptionsBol.value.series[0].data.map((item, index) => {
      chartOptionsBol.value.series[0].data[index] = null
    })
}


const getValuesDashboard = () => {
  isLoading.value = true

  if (props.evaluations.length === 0) {
    resetChart(); 
    return
  }
  resetChart();

  props.evaluations.map((item, index) => {
    let valueBol;
    const month = getMonthofDate(props.evaluations[index]?.date_evaluation)
 
    if(props.evaluations[index]?.valueBol === true){
      valueBol = 1
    }else{
      valueBol = 0
    }
    chartOptionsBol.value.series[0].data[month] = valueBol as any
  })

  isLoading.value = false
}

onMounted(() => {
  getValuesDashboard();
})
</script>

<style scoped>

.vue-apexcharts{
  width: 100%;
}
</style>