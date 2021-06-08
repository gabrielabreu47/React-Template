import { OPERATION_SUCCESS } from '../actions/operationSuccessActions';

const initialState = 0;

const opeationSuccess = (state = initialState, action) => {
    switch (action.type) {
        case OPERATION_SUCCESS:
            return action.payload.value
        default:
            return state;
    }
}

export default opeationSuccess;