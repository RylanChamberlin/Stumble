
import { USERS_CHECK_INS_STATE_CHANGE } from "../constants"

const initialState = {
    checkIns: [],
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS_CHECK_INS_STATE_CHANGE:
            return {
                ...state,
                checkIns: action.checkIns
            }
        default:
            return state;
    }
}