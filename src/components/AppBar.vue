<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="emit('toggle-drawer')" />
    <v-toolbar-title>My App</v-toolbar-title>
    <v-spacer />
    <div v-if="!userStore.isLoggedIn">
      <v-btn text @click="goLogin">로그인</v-btn>
    </div>
    <div v-else>
      <span class="mr-3">Welcome, {{ userStore.userId }}</span>
      <v-btn text @click="logout">로그아웃</v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import { defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const emit = defineEmits(["toggle-drawer", "logout"]);

const userStore = useUserStore();
const router = useRouter();

const goLogin = () => router.push("/login");
const logout = () => {
  userStore.logout();
  alert("로그아웃 완료!");
  router.push("/");
};

onMounted(() => {
  userStore.restoreSession();
});
</script>
