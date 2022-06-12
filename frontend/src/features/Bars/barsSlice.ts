import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


export type Bar = {
  geohash: string
  lat: number
  lng: number
  name: string
  postCount: number
  rating: number
  topPost: string
}

// Define a type for the slice state
interface BarsState {
  bars: Bar[]
  loading: boolean
  error: any
}

// Define the initial state using that type
const initialState: BarsState = {
  bars: [],
  loading: true,
  error: null

}

export const barsSlice = createSlice({
  name: 'bars',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      
    },
    decrement: (state) => {
     
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload
    },




  },
})

export const { increment, decrement, incrementByAmount } = barsSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default barsSlice.reducer