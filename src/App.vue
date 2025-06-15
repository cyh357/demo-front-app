<template>
  <v-app>
    <!-- 상단 앱 바 -->
    <AppBar v-model:drawer="drawer" @toggle-drawer="drawer = !drawer" />
    <!-- 사이드 네비게이션 드로어 -->
    <SideBar v-model:drawer="drawer" />

    <!-- 메인 콘텐츠 영역 -->
    <v-main>
      <v-container class="pa-4">
        <router-view />
      </v-container>
    </v-main>

    <!-- 하단 푸터 -->
    <PageFooter />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import AppBar from "@/components/AppBar.vue";
import SideBar from "@/components/SideBar.vue";
import PageFooter from "@/components/PageFooter.vue";

const drawer = ref(false);
// const test = () => {
//   drawer.value = !drawer.value;
//   // eslint-disable-next-line no-debugger
//   debugger;
//   console.log("test:" + drawer.value);
// };
</script>

<style>
/* 필요 시 스타일 추가 */
</style>
