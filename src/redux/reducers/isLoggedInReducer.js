import { SET_LOGGED_IN } from '../actions/isLoggedInActions';
import { currentUserStorage } from 'localStorage';

let initialState = false;

if (currentUserStorage.getString()) {
    initialState = true;
}

const isLoggedIn = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN:
            return action.payload.value;
        default:
            return state;
    }
};

export default isLoggedIn;