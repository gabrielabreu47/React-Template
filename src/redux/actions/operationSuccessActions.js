export const OPERATION_SUCCESS = 'OPERATION_SUCCESS';

export const SetOperationSuccess = (value) => {
    return {
        type: OPERATION_SUCCESS,
        payload: {
            value: value
        }
    }
}