import type { Income } from '@/types/types';
import axios from 'axios'

const token = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

const instanse = axios.create({
    baseURL:'http://109.73.206.144:6969/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export async function loadIncomes({dateFrom='2025-07-01',dateTo='2025-07-20',page=1,limit=10}:any):Promise<Income[] | string> {
  try {
    const res = await instanse.get<{ data: Income[] }>('incomes', {
    params: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        page: page,
        limit: limit,
        key: token
    }
    })
    return res.data.data
  } catch (e:any) {
    return e.message
  }
}