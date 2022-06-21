import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


// Define a type for the slice state
interface LocationState {
  coords: any
  info: any
  friends: any
  friendsInfo: any
}

// Define the initial state using that type
const initialState: LocationState = {
  coords: null,
  info: null,

  friends: null,
  friendsInfo: null,

}

export const locationSlice = createSlice({
  name: 'location',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    storeLocation: (state, action: PayloadAction<any>) => {
      state.coords = action.payload
    },
    storeUserInfo: (state, action: PayloadAction<any>) => {
      state.info = action.payload
    },
    storeUserFriends: (state, action: PayloadAction<any>) => {
      state.friends = action.payload
    },
    storeUserFriendsInfo: (state, action: PayloadAction<any>) => {
      state.friends = action.payload
    },
  },
})

export const { storeLocation, storeUserInfo, storeUserFriends, storeUserFriendsInfo  } = locationSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value
export const selectLocation = (state: RootState) => state.location.coords
export const selectInfo = (state: RootState) => state.location.info
export const selectFriends = (state: RootState) => state.location.friends
export const selectFriendsInfo = (state: RootState) => state.location.friendsInfo

export default locationSlice.reducer