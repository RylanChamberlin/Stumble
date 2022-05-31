import { USERS_LAST_POST_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants";

const initialState = {
    posts: [],
    lastDoc: undefined,
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
        default:
            return state;
    }
}