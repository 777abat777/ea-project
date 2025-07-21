<script setup lang="ts">
import { loadIncomes } from '@/api/api'
import IncomesChart from '@/components/charts/IncomesChart.vue'
import IncomesFilters from '@/components/IncomesFilters.vue'
import IncomesForm from '@/components/IncomesForm.vue'
import IncomesTable from '@/components/IncomesTable.vue'
import type { Income } from '@/types/types'
import { ref, onMounted, computed } from 'vue'

const error = ref<string | null>(null)

const activeFilters = ref({
  date: '',
  warehouse: '',
  article: '',
  minQuantity: 0,
})

const filteredIncomes = computed(() =>
  incomes.value.filter(
    (i) =>
      (activeFilters.value.date === '' || i.date.startsWith(activeFilters.value.date)) &&
      i.warehouse_name.toLowerCase().includes(activeFilters.value.warehouse.toLowerCase()) &&
      i.supplier_article.toLowerCase().includes(activeFilters.value.article.toLowerCase()) &&
      i.quantity >= activeFilters.value.minQuantity,
  ),
)

const incomes = ref<Income[]>([])
const totalCount = ref(0)
const currentPage = ref(1)
const currentLimit = ref(50)
const rangeFrom = ref(0)
const rangeTo = ref(0)

async function load(params: { dateFrom: string; dateTo: string; page: number; limit: number }) {
  const result = await loadIncomes(params)
  if (typeof result === 'string') {
    error.value = result
  } else {
    incomes.value = result.items
    totalCount.value = result.total
    currentPage.value = result.currentPage
    currentLimit.value = result.perPage
    rangeFrom.value = result.from
    rangeTo.value = result.to
  }
}

onMounted(() => {
  load({
    dateFrom: '2025-07-01',
    dateTo: '2025-07-20',
    page: 1,
    limit: 10,
  })
})
</script>

<template>
  <div>
    <h1>Incomes</h1>
    <IncomesForm
      :page="currentPage"
      :limit="currentLimit"
      :total="totalCount"
      :from="rangeFrom"
      :to="rangeTo"
      @update="load"
    />
    <div class="content">
      <div class="content__left">
        <IncomesFilters v-model="activeFilters" />
        <IncomesTable :incomes="filteredIncomes" />
      </div>
      <IncomesChart :incomes="incomes" />
    </div>
  </div>
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 50px 0;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}
</style>
