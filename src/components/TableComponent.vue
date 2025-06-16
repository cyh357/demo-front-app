<template>
  <v-table density="comfortable">
    <thead>
      <tr>
        <th v-for="col in props.columns" :key="col.key">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
        <td v-for="col in columns" :key="col.key">
          <span
            v-if="col.clickable"
            class="clickable"
            @click="$emit('cell-click', { row, column: col })"
          >
            {{ formatCell(row[col.key], col) }}
          </span>
          <span v-else>
            {{ formatCell(row[col.key], col) }}
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
});

defineEmits(["cell-click"]);

function formatCell(value, col) {
  if (col.format === "date") {
    return value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "";
  }
  return value;
}
</script>

<style scoped>
.clickable {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}
</style>
