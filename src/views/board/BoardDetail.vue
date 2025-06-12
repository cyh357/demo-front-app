<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        v-on:click="fnUpdate"
      >
        수정</button
      >&nbsp;
      <button
        type="button"
        class="w3-button w3-round w3-red"
        v-on:click="fnDelete"
      >
        삭제</button
      >&nbsp;
      <button
        type="button"
        class="w3-button w3-round w3-gray"
        v-on:click="fnList"
      >
        목록
      </button>
    </div>
    <div class="board-contents">
      <h3>{{ board.title }}</h3>
      <div>
        <strong class="w3-large">{{ author }}</strong>
        <br />
        <span>{{ board.createAt }}</span>
      </div>
    </div>
    <div class="board-contents">
      <span>{{ board.contents }}</span>
    </div>
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        v-on:click="fnUpdate"
      >
        수정</button
      >&nbsp;
      <button
        type="button"
        class="w3-button w3-round w3-red"
        v-on:click="fnDelete"
      >
        삭제</button
      >&nbsp;
      <button
        type="button"
        class="w3-button w3-round w3-gray"
        v-on:click="fnList"
      >
        목록
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

const id = parseInt(router.params.id);
const board = ref({
  id: 0,
  title: "",
  contents: "",
  author: "",
  createAt: "",
});

const fetchData = async () => {
  const responce = await axios.get(`/api/board/${id}`);
  // eslint-disable-next-line no-debugger
  debugger;
  board.value = responce.data;
  // eslint-disable-next-line no-debugger
  debugger;
};

onMounted(() => {
  fetchData();
});
</script>

<style scope></style>
