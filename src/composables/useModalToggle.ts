import { ref } from 'vue'

const isOpenModal = ref(false)

export default function useModalToggle() {
  return {
    isOpenModal
  }
}