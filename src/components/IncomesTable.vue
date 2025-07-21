<template>
  <table class="income-table">
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          @click="header.column.getToggleSortingHandler()"
          class="clickable"
        >
          <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          <span v-if="header.column.getIsSorted() === 'asc'"> 🔼 </span>
          <span v-else-if="header.column.getIsSorted() === 'desc'"> 🔽 </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  FlexRender,
  type ColumnDef,
} from '@tanstack/vue-table'
import type { Income } from '@/types/types'
import { computed } from 'vue'

const props = defineProps<{ incomes: Income[] }>()

const columns: ColumnDef<Income>[] = [
  { accessorKey: 'income_id', header: '№' },
  { accessorKey: 'warehouse_name', header: 'Склад' },
  { accessorKey: 'supplier_article', header: 'Артикул' },
  { accessorKey: 'quantity', header: 'Количество' },
  { accessorKey: 'date', header: 'Дата' },
]

const table = useVueTable({
  data: computed(() => props.incomes),
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<style scoped>
.income-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.6rem;
  border: 1px solid #ccc;
  text-align: left;
}

th.clickable {
  cursor: pointer;
  background-color: #f2f2f2;
}
</style>
