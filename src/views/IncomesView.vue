<script setup lang="ts">
import { loadIncomes } from '@/api/api'
import IncomesChart from '@/components/charts/IncomesChart.vue'
import IncomesForm from '@/components/IncomesForm.vue'
import type { Income } from '@/types/types'
import { ref, onMounted ,computed} from 'vue'



const incomes = ref<Income[]>([])
const error = ref<String|null>(null)

const searchWarehouse = ref('')
const filteredIncomes = computed(() =>
  incomes.value.filter(i => i.warehouse_name.toLowerCase().includes(searchWarehouse.value.toLowerCase()))
)
async function load(params: { dateFrom: string; dateTo: string; page: number; limit: number }){
  const result = await loadIncomes(params)
  if (typeof result === 'string') {
    error.value = result
  } else {
    incomes.value = result
  }
}
onMounted(()=>{load({dateFrom:'2025-07-01',dateTo:'2025-07-20',page:1,limit:10})})


</script>

<template>
  <div>
    <h1> Incomes</h1>
    <IncomesForm @update="load"/>
    <input v-model="searchWarehouse" placeholder="Фильтр по складу" />
    <div class="content">
    <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Склад</th>
          <th>Артикул</th>
          <th>Кол-во</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="income in filteredIncomes" :key="income.nm_id">
          <td>{{ income.income_id }}</td>
          <td>{{ income.warehouse_name }}</td>
          <td>{{ income.supplier_article }}</td>
          <td>{{ income.quantity }}</td>
          <td>{{ income.date }}</td>
        </tr>
      </tbody>
    </table>

    <IncomesChart :incomes="incomes" />
</div>
  </div>
</template>

<style scoped>
.content{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
h1{
    text-align: center;
    margin-bottom: 20px;
}

table{
    border-collapse: collapse;
 
}
td{
    border: 1px solid black;
}


</style>