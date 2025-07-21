<template>
  <form @submit.prevent="onSubmit" class="filter-form">
    <div class="field">
      <label>Дата от:</label>
      <input type="date" v-model="localDateFrom" />
    </div>

    <div class="field">
      <label>Дата до:</label>
      <input type="date" v-model="localDateTo" />
    </div>

    <div class="field">
      <label>Лимит на странице:</label>
      <select v-model.number="localLimit">
        <option :value="10">10</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="500">500</option>
      </select>
    </div>

    <button type="submit">🔍 Запросить</button>
  </form>

  <div class="pagination-controls">
    <button :disabled="page <= 1" @click="changePage(page - 1)">← Назад</button>
    <span>Страница {{ page }} из {{ totalPages }}</span>
    <button :disabled="page >= totalPages" @click="changePage(page + 1)">Вперёд →</button>
  </div>

  <div v-if="total > 0" class="pagination-range">
    <span>Показано {{ from }}–{{ to }} из {{ total }} записей</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  page: number
  limit: number
  total: number
  from: number
  to: number
}>()

const emit = defineEmits<{
  (
    e: 'update',
    payload: {
      dateFrom: string
      dateTo: string
      page: number
      limit: number
    },
  ): void
}>()

const localDateFrom = ref('2025-07-01')
const localDateTo = ref('2025-07-20')
const localLimit = ref(props.limit)
const page = ref(props.page)

watch(
  () => props.page,
  (newVal) => (page.value = newVal),
)
watch(
  () => props.limit,
  (newVal) => (localLimit.value = newVal),
)
watch(localLimit, (newLimit) => {
  const maxPages = Math.ceil(props.total / newLimit)
  page.value = Math.min(page.value, maxPages)
  onSubmit()
})

const totalPages = computed(() => (props.total > 0 ? Math.ceil(props.total / localLimit.value) : 1))

function onSubmit() {
  emit('update', {
    dateFrom: localDateFrom.value,
    dateTo: localDateTo.value,
    page: page.value,
    limit: localLimit.value,
  })
}

function changePage(newPage: number) {
  page.value = newPage
  onSubmit()
}
</script>

<style scoped>
.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  background: #f0f4f8;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.field {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}
.field label {
  font-weight: bold;
  margin-bottom: 0.3rem;
}
input,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button[type='submit'] {
  background: #0078d7;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
button[type='submit']:hover {
  background: #005fa3;
}
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}
.pagination-controls button {
  padding: 0.5rem 1rem;
  background: #0078d7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.pagination-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.pagination-range {
  margin-top: 0.5rem;
  text-align: center;
  color: #555;
}
</style>
