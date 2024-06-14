
import useModalToggle from './useModalToggle';
const { isOpenModal } = useModalToggle()

export default function cancelEdit(){
    isOpenModal.value = false
}

