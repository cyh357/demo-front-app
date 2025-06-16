<template>
  <v-container class="py-6">
    <v-card class="pa-6" max-width="700" elevation="2">
      <v-card-title class="text-h5 mb-4">게시글 등록</v-card-title>

      <v-card-text>
        <v-btn
          variant="outlined"
          size="small"
          class="mb-4"
          @click="router.back()"
        >
          ← 뒤로가기
        </v-btn>

        <!-- 제목 -->
        <v-text-field
          v-model="board.title"
          label="제목"
          outlined
          required
          :rules="[required]"
          class="mb-4"
        />

        <!-- 내용 -->
        <v-textarea
          v-model="board.contents"
          label="내용"
          outlined
          rows="6"
          required
          :rules="[required]"
          class="mb-4"
        />
      </v-card-text>

      <v-card-actions class="d-flex justify-end gap-2">
        <v-btn color="primary" @click="saveBoard">등록</v-btn>
        <v-btn color="grey" @click="goList">목록</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { required } from "@/utils/validationRules";

const router = useRouter();
const userStore = useUserStore();

const board = ref({
  title: "",
  contents: "",
  author: userStore.userId, // session으로 사용자 저장(pinia에 저장해논 값.).
});

const saveBoard = async () => {
  try {
    await axios.post("/api/board", board.value);
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
