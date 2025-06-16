<template>
  <v-container class="py-6">
    <!-- 등록 버튼 -->
    <v-row class="mb-4" justify="end">
      <v-btn color="primary" @click="fnWrite">등록</v-btn>
    </v-row>

    <!-- 테이블 컴포넌트 -->
    <!-- 테이블의 모양이나 기능이 다양해서 상세하게 설정해야되면 따로 컴포넌트 파서 직접 만들어줘야함. -->
    <TableComponent
      :columns="tableColumns"
      :rows="tableData"
      @cell-click="fnDetails"
    />

    <!-- 페이지네이션 -->
    <v-row justify="center" class="mt-6" v-if="paging.totalCount > 0">
      <v-btn icon @click="fnPage(1)">
        <v-icon>mdi-chevron-double-left</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="paging.start_page > 10"
        @click="fnPage(paging.start_page - 1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        v-for="n in paginavigation()"
        :key="n"
        @click="fnPage(n)"
        :color="paging.pageIndex === n ? 'primary' : undefined"
        variant="outlined"
        class="mx-1"
      >
        {{ n }}
      </v-btn>

      <v-btn
        icon
        v-if="paging.total_page_cnt > paging.end_page"
        @click="fnPage(paging.end_page + 1)"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn icon @click="fnPage(paging.total_page_cnt)">
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
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
  { label: "등록일시", key: "createdAt", format: "date" },
];

const tableData = ref([]);

const paging = ref({
  pageIndex: Number(route.query.page) || 1,
  pageSize: 10,
  totalCount: 3,
  total_page_cnt: 1,
  start_page: 1,
  end_page: 10,
});

const fetchData = async () => {
  const response = await axios.get("/api/board", {
    params: {
      pageIndex: paging.value.pageIndex,
      pageSize: paging.value.pageSize,
    },
  });
  tableData.value = response.data.data;
  paging.value.totalCount = response.data.totalCount;
};

const fnPage = (page) => {
  paging.value.page = page;
  fetchData();
};

const paginavigation = () => {
  const pages = [];
  for (let i = paging.value.start_page; i <= paging.value.end_page; i++) {
    pages.push(i);
  }
  return pages;
};

const fnWrite = () => {
  router.push({ name: "BoardWrite" });
};

const fnDetails = ({ row, column }) => {
  if (column.key === "title") {
    router.push({ name: "BoardDetail", params: { id: row.id } });
  }
};

onMounted(fetchData);
</script>
