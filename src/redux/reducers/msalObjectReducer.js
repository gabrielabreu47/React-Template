import { SET_MSAL } from '../actions/msalActions';

const initialState = null;

const msal = (state = initialState, action) => {
    switch (action.type) {
        case SET_MSAL:
            return action.payload.value
        default:
            return state;
    }
}

export default msal;