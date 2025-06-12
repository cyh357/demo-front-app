<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(col, index) in props.columns" :key="index">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
        <td v-for="(col, colIndex) in props.columns" :key="colIndex">
          <span
            v-if="col.clickable"
            class="clickable-link"
            @click="$emit('cell-click', { row, column: col })"
            >{{ row[col.key] }}</span
          >
          <span v-else>
            {{ row[col.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
// Props 정의
const props = defineProps({
  columns: {
    type: Array, // [{ label: "제목", key: "title",  clickable: true }, ...] 옵션도 자유롭게 설정가능.
    required: true,
  },
  rows: {
    type: Array, // [{ id: 1, title: '공지사항', author: '관리자' }, ...]
    required: true,
  },
});

defineEmits(["cell-click"]);
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
thead {
  background-color: #f5f5f5;
}
.clickable-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
