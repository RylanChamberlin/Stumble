import { USER_BARS_STATE_CHANGE, USER_STATE_CHANGE, USER_LOCATION_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, USER_FRIEND_REQUESTS_STATE_CHANGE, USER_FRIEND_REQUESTS_SENT_STATE_CHANGE, USER_FRIENDS_DATA_STATE_CHANGE } from "../constants";

const initialState = {
    currentUser: null,
    currentUserLocation: null,
    currentUserFriends: [],
    currentUserFriendRequests: [],
    currentUserFriendRequestsSent: [],
    currentUserFriendsData: [],
    bars: []
}

export const user = (state = initialState, action) => {
    switch(action.type){
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_LOCATION_STATE_CHANGE:
            return {
                ...state,
                currentUserLocation: action.currentUserLocation
            } 
        case USER_FRIENDS_STATE_CHANGE:
            return {
                ...state,
                currentUserFriends: action.currentUserFriends
            } 
        case USER_FRIEND_REQUESTS_STATE_CHANGE:
            return {
                ...state,
                currentUserFriendRequests: action.currentUserFriendRequests
            } 
        case USER_FRIEND_REQUESTS_SENT_STATE_CHANGE:
            return {
                ...state,
                currentUserFriendRequestsSent: action.currentUserFriendRequestsSent
            } 
        case USER_FRIENDS_DATA_STATE_CHANGE:
            return {
                ...state,
                currentUserFriendsData: [...state.currentUserFriendsData, action.currentUserFriendsData]
            }
        case USER_BARS_STATE_CHANGE:
            return {
                ...state,
                bars: action.bars
            }
        default:
            return state;
    }
    
}