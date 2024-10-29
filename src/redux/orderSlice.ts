import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Order } from '../types/order'

export const initialOrder: Order = {
  id: "",
  technique: {
    title: "",
    price: 0
  },
  product: {
    title: "",
    url: ""
  },
  label: "",
  typographic: {
    title: ""
  },
  labelColor: {
    code: "",
    title: ""
  },
  productStyle: {
    code: "",
    title: ""
  },
  productSize: {
    code: "",
    title: ""
  },
  productColor: {
    code: "",
    title: ""
  },
  art: {
    title: "",
    url: ""
  },
  patchAdd: {
    title: "",
    url: ""
  },
  motifAdd: {
    title: "",
    url: ""
  },
  textAdd: {
    title: "",
    url: ""
  }
}

export type OrderState = {
    order: Order | null
}

// Define the initial state using that type
const initialState: OrderState = {
  order: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state: OrderState, action: PayloadAction<Order>) => {
      state.order = {
        ...initialOrder, 
        ...action.payload
      }
    },    
    cleanOrder: (state) => {
      state.order = null;
    },
  },
})

export const { addOrder, cleanOrder } = orderSlice.actions
export const orderReducer = orderSlice.reducer;