import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type User } from "@/types/user";
export default function useUsersList() {


    const dataUsers = ref<User[]>([])
    const isload = ref(false)

    const getUsers = async () => {
        isload.value = true
        await axiosInstance.get(`/api/users`).then(
            response => (dataUsers.value = response.data.data ))
            .catch((error) => {
                console.log(error);
            });
        isload.value = false
    }


    onMounted(getUsers)


    return {
        dataUsers,
        isload
    }

}








