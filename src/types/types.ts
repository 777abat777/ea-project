export type Income = {
  barcode: number
  date: string
  date_close: string
  income_id: number
  last_change_date: string
  nm_id: number
  number: string
  quantity: number
  supplier_article: string
  tech_size: string
  total_price: string
  warehouse_name: string
}

export interface IncomesApiResponse {
  data: Income[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number
    to: number
  }
}
export interface OrdersApiResponse {
  data: Order[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
    from: number
    to: number
  }
}

export interface Order {
  barcode: number
  brand: string
  cancel_dt: string
  category: string
  date: string
  discount_percent: number
  g_number: string
  income_id: number
  is_cancel: boolean
  last_change_date: string
  nm_id: number
  oblast: string
  odid: string
  subject: string
  supplier_article: string
  tech_size: string
  total_price: string
  warehouse_name: string
}
