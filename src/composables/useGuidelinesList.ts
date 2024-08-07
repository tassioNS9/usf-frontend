import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type Guideline } from '@/types/guideline'

export default function useGuidelinesList() {
   
    const dataGuidelines = ref<Guideline[]>([])
    const isload = ref(false)

    const getGuidelines = async () => {
        isload.value = true
        await axiosInstance.get('/api/Guidelines').then(
            response => (dataGuidelines.value = response.data.data ))
            .catch((error) => {
                console.log(error);
            });
        isload.value = false
    }

 

    onMounted(getGuidelines)

    return {
        dataGuidelines,
        getGuidelines,
        isload
    }

}