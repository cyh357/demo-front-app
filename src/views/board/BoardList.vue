<template>
  <v-container class="py-5">
    <v-card elevation="3" class="pa-4">
      <!-- 등록 버튼 -->
      <div class="d-flex justify-end mb-4">
        <v-btn color="primary" @click="goWrite">등록</v-btn>
      </div>

      <v-data-table-server
        :headers="tableHeaders"
        v-model:page="paging.pageIndex"
        :items="boards"
        :items-length="paging.totalCount"
        :items-per-page="paging.pageSize"
        :loading="loading"
        class="elevation-1"
        @update:page="onPageChange"
        @click:row="goDetail"
      >
        <template #no-data>
          <div class="text-center py-6">데이터가 없습니다.</div>
        </template>
        <!-- createdAt 포맷 변경 -->
        <template #[`item.createdAt`]="{ item }">
          {{ formatDateTime(item.createdAt) }}
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { formatDateTime } from "@/utils/dateFormatter";

const router = useRouter();
const route = useRoute();

const loading = ref(false);

const tableHeaders = [
  { title: "ID", key: "id" },
  { title: "제목", key: "title" },
  { title: "작성자", key: "author" },
  { title: "등록일시", key: "createdAt" },
];

const boards = ref([]);
const paging = ref({
  pageIndex: Number(route.query.pageIndex) || 1,
  pageSize: 10,
  totalCount: 0,
});

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await axios.get("/api/board", {
      params: {
        pageIndex: paging.value.pageIndex,
        pageSize: paging.value.pageSize,
      },
    });
    boards.value = res.data.data;
    paging.value.totalCount = res.data.totalCount;
  } catch (e) {
    console.error("데이터 불러오기 실패", e);
  } finally {
    loading.value = false;
  }
};

const onPageChange = (newPage) => {
  paging.value.pageIndex = newPage;
  fetchData();
};

const goWrite = () => {
  router.push({ name: "BoardWrite" });
};

const goDetail = (event, data) => {
  router.push({ name: "BoardDetail", params: { id: data.item.id } });
};

onMounted(() => {
  fetchData();
});
</script>
