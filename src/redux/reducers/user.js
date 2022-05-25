import { USER_STATE_CHANGE, USER_LOCATION_STATE_CHANGE, USER_FRIENDS_STATE_CHANGE, USER_FRIEND_REQUESTS_STATE_CHANGE } from "../constants";

const initialState = {
    currentUser: null,
    currentUserLocation: null,
    currentUserFriends: [],
    currentUserFriendRequests: []
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
        default:
            return state;
    }
    
}