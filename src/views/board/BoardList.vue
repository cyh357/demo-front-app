<template>
  <div class="board-list">
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="fnWrite"
      >
        등록
      </button>
    </div>
    <!-- 컴포넌트화 시킨 테이블 -->
    <TableComponent
      :columns="tableColumns"
      :rows="tableData"
      @cell-click="fnDetails"
    />
    <div
      class="pagination w3-bar w3-padding-16 w3-small"
      v-if="paging.total_list_cnt > 0"
    >
      <span class="pg">
        <a
          href="javascript:;"
          @click="fnPage(1)"
          class="first w3-button w3-border"
          >&lt;&lt;</a
        >
        <a
          href="javascript:;"
          v-if="paging.start_page > 10"
          @click="fnPage(`${paging.start_page - 1}`)"
          class="prev w3-button w3-border"
          >&lt;</a
        >
        <template v-for="(n, index) in paginavigation()">
          <template v-if="paging.page == n">
            <strong class="w3-button w3-border w3-green" :key="index">{{
              n
            }}</strong>
          </template>
          <template v-else>
            <a
              class="w3-button w3-border"
              href="javascript:;"
              @click="fnPage(`${n}`)"
              :key="index"
              >{{ n }}</a
            >
          </template>
        </template>
        <a
          href="javascript:;"
          v-if="paging.total_page_cnt > paging.end_page"
          @click="fnPage(`${paging.end_page + 1}`)"
          class="next w3-button w3-border"
          >&gt;</a
        >
        <a
          href="javascript:;"
          @click="fnPage(`${paging.total_page_cnt}`)"
          class="last w3-button w3-border"
          >&gt;&gt;</a
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TableComponent from "@/components/TableComponent.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const tableColumns = [
  { label: "ID", key: "id" },
  { label: "제목", key: "title", clickable: true },
  { label: "작성자", key: "author" },
  {
    label: "등록일시",
    key: "createdAt",
    format: "date",
  },
];

const tableData = ref([
  {
    id: 0,
    title: "",
    author: "",
    createdAt: "",
  },
]);

const paging = ref({
  block: 0,
  end_page: 10,
  next_block: 0,
  page: Number(route.query.page) || 1,
  page_size: 10,
  prev_block: 0,
  start_index: 0,
  start_page: 1,
  total_block_cnt: 1,
  total_list_cnt: 3,
  total_page_cnt: 1,
});

const fetchData = async () => {
  // axios get으로 데이터 받아옴.
  const response = await axios.get("/api/board");
  tableData.value = response.data;
};

const fnPage = (page) => {
  paging.value.page = page;
  fetchData();
};

const paginavigation = () => {
  const pageNumber = [];
  for (let i = paging.value.start_page; i <= paging.value.end_page; i++) {
    pageNumber.push(i);
  }
  return pageNumber;
};

const fnWrite = () => {
  router.push({
    name: "BoardWrite",
  });
};

// const fnView = (idx) => {
//   alert(`상세 보기: ${idx}`);
// };

const fnDetails = ({ row, column }) => {
  if (column.key === "title") {
    // 예: 상세 페이지로 이동
    router.push({
      name: "BoardDetail",
      params: { id: row.id },
    });
    // 또는 alert:
    // alert(`"${row.title}" 클릭됨`);
  }
};

onMounted(() => {
  fetchData();
});
</script>
<style scoped></style>
