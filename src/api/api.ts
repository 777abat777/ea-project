import type { IncomesApiResponse } from '@/types/types'
import axios from 'axios'

const token = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

const instance = axios.create({
  baseURL: 'http://109.73.206.144:6969/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

export async function loadIncomes({
  dateFrom = '2025-07-01',
  dateTo = '2025-07-20',
  page = 1,
  limit = 10,
}: {
  dateFrom: string
  dateTo: string
  page: number
  limit: number
}) {
  try {
    const res = await instance.get<IncomesApiResponse>('incomes', {
      params: {
        key: token,
        dateFrom,
        dateTo,
        page,
        limit,
      },
    })

    return {
      items: res.data.data,
      total: res.data.meta.total,
      currentPage: res.data.meta.current_page,
      lastPage: res.data.meta.last_page,
      from: res.data.meta.from,
      to: res.data.meta.to,
      perPage: Number(res.data.meta.per_page),
    }
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'message' in e) {
      return (e as { message: string }).message
    }
    return 'Неизвестная ошибка'
  }
}

export async function loadOrders({
  dateFrom = '2025-07-01',
  dateTo = '2025-07-20',
  page = 1,
  limit = 10,
}: {
  dateFrom: string
  dateTo: string
  page: number
  limit: number
}) {
  try {
    const res = await instance.get<IncomesApiResponse>('orders', {
      params: {
        key: token,
        dateFrom,
        dateTo,
        page,
        limit,
      },
    })
    return {
      items: res.data.data,
      total: res.data.meta.total,
      currentPage: res.data.meta.current_page,
      lastPage: res.data.meta.last_page,
      from: res.data.meta.from,
      to: res.data.meta.to,
      perPage: Number(res.data.meta.per_page),
    }
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'message' in e) {
      return (e as { message: string }).message
    }
    return 'Неизвестная ошибка'
  }
}

loadOrders({
  dateFrom: '2025-07-01',
  dateTo: '2025-07-20',
  page: 1,
  limit: 10,
})
