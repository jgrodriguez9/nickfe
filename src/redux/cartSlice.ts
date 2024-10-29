import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Order } from '../types/order'

export type CartState = {
    cart: Order[]
    openCart: boolean
}

// Define the initial state using that type
const initialState: CartState = {
  cart: [],
  openCart: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Order>) => {
      if(!state.cart.some((it:Order)=>it.id === action.payload.id)){
        state.cart.push({ ...action.payload });
      }      
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeItem = state.cart.filter(
        (item:Order) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    cleanCart: (state) => {
      state.cart = [];
    },
    toggleCart: (state, action: PayloadAction<boolean> ) => {
      state.openCart = action.payload
    },
    openCart: (state) => {
      state.openCart = true
    },
    closeCart: (state) => {
      state.openCart = false
    }
  },
})

export const { addToCart, removeItem, toggleCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer;