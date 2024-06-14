import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type Unit } from "@/types/user";
export default function useUnitsList() {

    const dataUnits = ref<Unit[]>([])
    const isload = ref(false)

    const getUnits = async () => {
        isload.value = true
        await axiosInstance.get('/api/units').then(
            response => (dataUnits.value = response.data.data))
            .catch((error) => {
                console.log(error);
            });
        isload.value = false
    }

    onMounted(getUnits)

    return {
        dataUnits,
        isload
    }

}