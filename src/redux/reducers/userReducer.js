import { SET_USER } from '../actions/userActions';
import { currentUserStorage } from 'localStorage';

let initialState = {};
const currentUser = currentUserStorage.getString();
if (currentUser) {
    initialState = currentUserStorage.get();
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default user;