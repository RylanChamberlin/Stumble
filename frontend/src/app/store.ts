import { configureStore } from '@reduxjs/toolkit'
import locationReducer from '../features/Location/locationSlice'


export const store = configureStore({
  reducer: {
    location: locationReducer,
  },

  

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false, //disables so time object from firebase db can pass
    })
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
//setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch