import { configureStore } from '@reduxjs/toolkit'
import { messageReducer } from './messageSlice'
import { cartReducer } from './cartSlice'
import { orderReducer } from './orderSlice'

export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart: cartReducer,
    order: orderReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch