import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/services/api';
import router from '@/router';
export const useAuth = defineStore('auth', () => {


  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user") as string));
  const userAuthetincated = ref(); 
  const role = ref(localStorage.getItem("ROLE"))
  const isAuth = ref(false);

  function setToken(tokenValue : string) {
    localStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue : any) {
    localStorage.setItem('user', JSON.stringify(userValue));
    user.value = userValue;
  }


  function setIsAuth(auth : boolean) {
    isAuth.value = auth;
  }

  const isAuthenticated = computed(() => {
      return token.value && user.value;
  })


  const fullName = computed(() => {
    if (userAuthetincated.value) {
      return userAuthetincated.value.name;
    }
    return '';
  })


  async function checkToken() {
    try {
      const tokenAuth = 'Bearer ' + token.value;
      const { data } = await api.get("/api/auth/verify", {
        headers: {
          Authorization: tokenAuth,
        },
      });
      localStorage.setItem('ROLE', data.user.role);
      userAuthetincated.value = data.user
      return data.user;
    } catch (error) {
      clear();
      router.push('/');
    }
  }

  function clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('ROLE');
    userAuthetincated.value = {};
    isAuth.value = false;
    token.value = '';
    user.value = '';
    role.value = '';
    router.push('/')
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    isAuthenticated,
    userAuthetincated,
    fullName,
    role,
    clear,
    setIsAuth,
    isAuth
  }

})
