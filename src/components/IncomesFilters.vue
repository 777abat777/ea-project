<template>
  <div class="filters">
    <div class="field">
      <label>Дата:</label>
      <input type="date" v-model="local.date" />
    </div>

    <div class="field">
      <label>Склад:</label>
      <input v-model="local.warehouse" placeholder="Название склада" />
    </div>

    <div class="field">
      <label>Артикул:</label>
      <input v-model="local.article" placeholder="Артикул" />
    </div>

    <div class="field">
      <label>Мин. количество:</label>
      <input type="number" min="0" v-model.number="local.minQuantity" />
    </div>
    <button type="button" @click="reset">🧹 Сбросить</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import debounce from 'lodash.debounce'

const props = defineProps<{
  modelValue: {
    date: string
    warehouse: string
    article: string
    minQuantity: number
  }
}>()

const emit = defineEmits(['update:modelValue'])

const local = reactive({ ...props.modelValue })

const debouncedEmit = debounce(() => {
  emit('update:modelValue', { ...local })
}, 500)

watch(local, debouncedEmit, { deep: true })

function reset() {
  local.date = ''
  local.warehouse = ''
  local.article = ''
  local.minQuantity = 0
  debouncedEmit()
}
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f2f2f2;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.field {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  flex: 1;
}

.field label {
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.field input {
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.5rem 1rem;
  background: #e55353;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  height: 40px;
  align-self: flex-end;
}

button:hover {
  background: #c52828;
}
</style>
