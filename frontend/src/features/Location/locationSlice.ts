import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


// Define a type for the slice state
interface LocationState {
  coords: any
}

// Define the initial state using that type
const initialState: LocationState = {
  coords: null

}

export const locationSlice = createSlice({
  name: 'location',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    storeLocation: (state, action: PayloadAction<any>) => {
        state.coords = action.payload
    }
  },
})

export const { storeLocation } = locationSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value
export const selectLocation = (state: RootState) => state.location.coords

export default locationSlice.reducer