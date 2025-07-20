<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'update', payload: {
    dateFrom: string
    dateTo: string
    page: number
    limit: number
  }): void
}>()

const localDateFrom = ref('2025-07-01')
const localDateTo = ref('2025-07-20')
const localPage = ref(1)
const localLimit = ref(10)

function onSubmit() {
  emit('update', {
    dateFrom: localDateFrom.value,
    dateTo: localDateTo.value,
    page: localPage.value,
    limit: localLimit.value
  })
}
</script>

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
      <label>Страница:</label>
      <input type="number" min="1" v-model.number="localPage" />
    </div>

    <div class="field">
      <label>Записей на странице:</label>
      <select v-model.number="localLimit">
        <option :value="10">10</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="500">500</option>
      </select>
    </div>

    <button type="submit">🔍 Показать</button>
  </form>
</template>

<style scoped>
.field{
    width: 20%;
    display: flex;
    gap: 20px;
    flex-grow: 1;
}
.filter-form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
}
.field label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: bold;
}
button {
    grid-column: span 2;
    padding: 0.5rem 1rem;
    background: #0078d7;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 20%;
}
button:hover {
  background: #005fa3;
}
</style>