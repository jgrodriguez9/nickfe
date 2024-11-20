import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CharacterOrder, DesignOrder, KeyValue, Order, ProductOrder, TechniqueOrder } from '../types/order'

export const initialOrder: Order = {
  id: "",
  technique: {
    id: "",
    imageUrl: "",
    name: "",
    price: 0
  },
  product: {
    id: "",
    imageUrl: "",
    name: "",
    price: 0,
    tallas: []
  },
  character: {
    id: "",
    imageUrl: "",
    name: "",
  },
  design: {
    id: "",
    imageUrl: "",
    name: "",
    sku: ""
  },
  label: "",
  typographic: {
    value: "",
    label: "",
    color: ""
  },
  labelColor: {
    value: "",
    label: ""
  },
  productStyle: {
    value: "",
    label: ""
  },
  productSize: {
    value: "",
    label: ""
  },
  productColor: {
    value: "",
    label: ""
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
    order: Order
}

// Define the initial state using that type
const initialState: OrderState = {
  order: initialOrder,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addTechnique: (state: OrderState, action: PayloadAction<TechniqueOrder>) => {
      state.order = {
        ...state.order, 
        technique: action.payload
      }
    },
    addProduct: (state: OrderState, action: PayloadAction<ProductOrder>) => {
      state.order = {
        ...state.order,  
        product: action.payload
      }
    },
    addCharacter: (state: OrderState, action: PayloadAction<CharacterOrder>) => {
      state.order = {
        ...state.order,  
        character: action.payload
      }
    },
    addDesign: (state: OrderState, action: PayloadAction<DesignOrder>) => {
      state.order = {
        ...state.order,  
        design: action.payload
      }
    },
    addOrder: (state: OrderState, action: PayloadAction<Order>) => {
      state.order = {
        ...state.order,  
        ...action.payload
      }
    },
    setValueOrder: (state: OrderState, action: PayloadAction<KeyValue>) => {
      state.order = {
        ...state.order,  
        [action.payload.key]: action.payload.value
      }
    } ,  
    cleanOrder: (state) => {
      state.order = initialOrder;
    },
  },
})

export const { addOrder, cleanOrder, addTechnique, addProduct, addCharacter, addDesign, setValueOrder } = orderSlice.actions
export const orderReducer = orderSlice.reducer;