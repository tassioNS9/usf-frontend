import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type Indicator } from '@/types/user'

export default function useIndicatorsList() {
   
    const dataIndicators = ref<Indicator[]>([])
    const isload = ref(false)

    const getIndicators = async () => {
        isload.value = true
        await axiosInstance.get('/api/indicators').then(
            response => (dataIndicators.value = response.data.data ))
            .catch((error) => {
                console.log(error);
            });
        isload.value = false
    }

 

    onMounted(getIndicators)

    return {
        dataIndicators,
        isload
    }

}