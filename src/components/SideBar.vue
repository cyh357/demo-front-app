<template>
  <v-navigation-drawer app v-model="drawer" temporary>
    <v-list dense>
      <v-list-item to="/" link>
        <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
        <v-list-item-title>홈</v-list-item-title>
      </v-list-item>

      <v-list-item to="/board/list" link>
        <v-list-item-icon
          ><v-icon>mdi-format-list-bulleted</v-icon></v-list-item-icon
        >
        <v-list-item-title>게시판</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  drawer: Boolean,
});

console.log("sidebar" + props.drawer);
const drawer = defineModel("drawer"); // v-model:drawer 와 연결
</script>
