<template>
  <div>
    <!-- template 내부 버튼 영역에 추가 -->
    <button @click="router.back">뒤로가기</button>
    <h2>게시글 등록</h2>
    <div>
      <label>제목:</label>
      <input required v-model="form.title" />
    </div>
    <div>
      <label>내용:</label>
      <textarea required v-model="form.contents"></textarea>
    </div>
    <button @click="submit">등록</button>
    <button @click="goList">목록</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const form = ref({
  title: "",
  contents: "",
  author: "사용자 ", //session으로 사용자 저장. test중에는 일단 하드코딩.
});

const submit = async () => {
  try {
    // eslint-disable-next-line no-debugger
    debugger;
    await axios.post("/api/board", form.value);
    alert("등록 완료");
    router.push({ name: "BoardList" });
  } catch (err) {
    alert("등록 실패");
  }
};

const goList = () => {
  router.push({ name: "BoardList" });
};
</script>
