<template>
  <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
</template>

<script setup lang="ts">
import type { Income } from '@/types/types';
import { computed } from 'vue'

const props = defineProps<{ incomes: Income[] }>()

// 📦 Группировка по складу
const warehouseStats = computed(() => {
  const map = new Map<string, number>()
  props.incomes.forEach(i => {
    map.set(i.warehouse_name, (map.get(i.warehouse_name) ?? 0) + i.quantity)
  })
  return Array.from(map.entries())
})

const chartOptions = computed(() => ({
  chart: { id: 'incomes-bar' },
  xaxis: {
    categories: warehouseStats.value.map(([name]) => name),
  },
  title: {
    text: 'Количество по складам',
    align: 'center',
  },
}))

const series = computed(() => [
  {
    name: 'Количество',
    data: warehouseStats.value.map(([, qty]) => qty),
  },
])
</script>
