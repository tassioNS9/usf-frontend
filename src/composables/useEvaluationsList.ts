import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type Evaluation } from '@/types/user'

export default function useEvaluationsList(unit:number) {
   
    const dataEvaluations = ref<Evaluation[]>([])
    const isload = ref(false)

    const getEvaluations = async () => {
        isload.value = true
        await axiosInstance.get(`/api/evaluations/unit/${unit}`).then(
            response => (dataEvaluations.value = response.data.data))
            .catch((error) => {
                console.log(error);
            });
            isload.value = false
    }
    

    onMounted(getEvaluations)

    return {
        dataEvaluations,
        isload,
    }

}