import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const userId = ref("");

  const login = async (user) => {
    const res = await axios.post("/api/user/login", user);
    console.log(res.data);

    isLoggedIn.value = res.data;
    console.log(user.value);
    // eslint-disable-next-line no-debugger
    debugger;
    userId.value = isLoggedIn.value ? user.userId : "";

    //session유지용
    sessionStorage.setItem("isLoggedIn", isLoggedIn.value);
    sessionStorage.setItem("userId", userId.value);

    return isLoggedIn.value;
  };

  const logout = () => {
    isLoggedIn.value = false;
    userId.value = "";
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userId");
  };

  const register = async (user) => {
    const res = axios.post("/api/user/register", user);
    return res.data > 0;
  };

  const restoreSession = () => {
    const storedLogin = sessionStorage.getItem("isLoggedIn");
    const storedUsername = sessionStorage.getItem("userId");

    isLoggedIn.value = storedLogin === "true";
    userId.value = storedUsername || "";
  };
  return {
    isLoggedIn,
    userId,
    login,
    logout,
    register,
    restoreSession,
  };
});
