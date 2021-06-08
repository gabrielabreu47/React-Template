import { CHANGE_IMAGE } from '../actions/changeImageActions';

const initialState = 0;

const changeImage = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IMAGE:
            return action.payload.value
        default:
            return state;
    }
}

export default changeImage;