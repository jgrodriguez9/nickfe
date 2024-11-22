import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AddQty, OrderCart } from '../types/order'

export type CartState = {
    cart: OrderCart[]
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
    addToCart: (state: CartState, action: PayloadAction<OrderCart>) => {
      if(!state.cart.some((it:OrderCart)=>it.code === action.payload.code)){
        state.cart.push({ ...action.payload });
      }      
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeItem = state.cart.filter(
        (item:OrderCart) => item.code !== action.payload
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
    },
    addQty: (state, action: PayloadAction<AddQty>) => {
      const copyCart = [...state.cart]
      const index = copyCart.findIndex((item:OrderCart) => item.code === action.payload.code)      
      if(index >= 0){
        copyCart[index].qty = action.payload.qty
      }
      state.cart = copyCart      
    }
  },
})

export const { addToCart, removeItem, toggleCart, addQty, cleanCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer;