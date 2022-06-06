import { USERS_LAST_POST_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_ALL_POSTS_STATE_CHANGE, CLEAR_DATA } from "../constants";

const initialState = {
    posts: [],
    lastDoc: false,
    allPosts: []
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts
            }

        case USERS_LAST_POST_STATE_CHANGE:
            return {
                ...state,
                lastDoc: action.lastDoc
            }
        case USERS_ALL_POSTS_STATE_CHANGE:
            return {
                ...state,
                allPosts: [...state.allPosts, ...action.allPosts]
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}