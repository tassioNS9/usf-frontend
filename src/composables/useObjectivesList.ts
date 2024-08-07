import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type Objective } from '@/types/objective'

export default function useObjectivesList() {
   
    const dataObjectives = ref<Objective[]>([])
    const isload = ref(false)

    const getObjectives = async () => {
        isload.value = true
        await axiosInstance.get('/api/Objectives').then(
            response => (dataObjectives.value = response.data.data ))
            .catch((error) => {
                console.log(error);
            });
        isload.value = false
    }

 
    onMounted(getObjectives)

    return {
        dataObjectives,
        getObjectives,
        isload
    }
}

