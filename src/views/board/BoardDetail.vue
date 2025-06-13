<template>
  <div class="board-detail">
    <!-- <div class="board-contents">
      <h3>{{ board.title }}</h3>
      <div>
        <strong class="w3-large">{{ author }}</strong>
        <br />
        <span>{{ board.createdAt }}</span>
      </div>
    </div>
    <div class="board-contents">
      <span>{{ board.contents }}</span>
    </div> -->
    <!-- <div>
      <h1 class="text-2xl font-bold mb-4">{{ board.title }}</h1>
      <p class="text-gray-600 mb-2">작성자: {{ board.author }}</p>
      <p class="text-gray-500 mb-4">작성일: {{ board.createdAt }}</p>
      <div class="border p-4 rounded shadow">
        {{ board.contents }}
      </div>
    </div> -->
    <div>
      <h2>{{ isEdit ? "게시글 수정" : "게시글 상세보기" }}</h2>

      <div>
        <label>제목:</label>
        <input v-model="board.title" :readonly="!isEdit" />
      </div>

      <div>
        <label>작성자: {{ board.author }}</label>
      </div>
      <div>
        <label>작성일: {{ board.createdAt }}</label>
      </div>
      <div>
        <label>내용:</label>
        <textarea v-model="board.contents" :readonly="!isEdit"></textarea>
      </div>

      <div class="common-buttons" style="margin-top: 1em">
        <button
          class="w3-button w3-round w3-blue-gray"
          v-if="!isEdit"
          @click="isEdit = true"
        >
          수정
        </button>
        <button
          class="w3-button w3-round w3-red"
          v-if="isEdit"
          @click="updatePost"
        >
          저장
        </button>
        <button
          class="w3-button w3-round w3-gray"
          v-if="isEdit"
          @click="deletePost"
        >
          삭제
        </button>
        <button class="w3-button w3-round w3-gray" @click="goList">목록</button>
      </div>
    </div>
    <!-- <div class="common-buttons">
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
    </div> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isEdit = ref(false);
const id = parseInt(route.params.id);
const board = ref({
  id: 0,
  title: "",
  contents: "",
  author: "",
  createdAt: "",
});

const fetchData = async () => {
  const responce = await axios.get(`/api/board/${id}`);
  board.value = responce.data;
  isEdit.value = false;
};

// function
const goList = () => {
  router.push({
    name: "BoardList",
  });
};

const deletePost = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  await axios.delete(`/api/board/${id}`);
  router.replace({ name: "BoardList" }); // 뒤로가기 클릭시 아무반응없는것처럼 보임. 티가 안남. mount시 오류처리 하는게 나을수도.
};

const updatePost = async () => {
  // null체크나 validation 추가하면됨.
  if (!confirm("저장하시겠습니까?")) return;
  // eslint-disable-next-line no-debugger
  debugger;
  await axios.put("/api/board/", board.value);
  alert("저장완료!"); // 수정가능상태와 수정 불가능상태가 css차이 나게 하면 alert 굳이..?
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<style scope></style>
