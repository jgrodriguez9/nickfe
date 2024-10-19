import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type MessageState = {
    message: string
    type: string
}

// Define the initial state using that type
const initialState: MessageState = {
  message: "",
  type: "",
}

export const messageSlice = createSlice({
  name: 'message',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = "";
      state.type = "";
    },
  },
})

export const { addMessage, clearMessage } = messageSlice.actions
export const messageReducer = messageSlice.reducer;