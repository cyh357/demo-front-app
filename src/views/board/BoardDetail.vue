<template>
  <v-container class="py-5">
    <v-card class="pa-5" max-width="800" elevation="3">
      <v-card-title>
        <h2>{{ isEdit ? "게시글 수정" : "게시글 상세보기" }}</h2>
      </v-card-title>

      <v-card-text>
        <!-- 제목 -->
        <v-text-field
          v-model="board.title"
          label="제목"
          :readonly="!isEdit"
          outlined
        />

        <!-- 작성자 -->
        <v-text-field v-model="board.author" label="작성자" readonly outlined />

        <!-- 작성일 -->
        <v-text-field
          v-model="board.createdAt"
          label="작성일"
          readonly
          outlined
        />

        <!-- 내용 -->
        <v-textarea
          v-model="board.contents"
          label="내용"
          :readonly="!isEdit"
          outlined
          rows="8"
        />
      </v-card-text>

      <v-card-actions class="d-flex justify-end flex-wrap gap-2">
        <v-btn color="blue-darken-1" v-if="!isEdit" @click="isEdit = true">
          수정
        </v-btn>
        <v-btn color="primary" v-if="isEdit" @click="updatePost"> 저장 </v-btn>
        <v-btn color="error" v-if="isEdit" @click="deletePost"> 삭제 </v-btn>
        <v-btn color="grey-darken-1" @click="goList">목록</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
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
  const response = await axios.get(`/api/board/${id}`);
  board.value = response.data;
  isEdit.value = false;
};

const goList = () => {
  router.push({ name: "BoardList" });
};

const deletePost = async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  await axios.delete(`/api/board/${id}`);
  router.replace({ name: "BoardList" });
};

const updatePost = async () => {
  if (!confirm("저장하시겠습니까?")) return;
  await axios.put("/api/board/", board.value);
  alert("저장 완료!");
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>
