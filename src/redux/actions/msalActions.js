export const SET_MSAL = 'SET_MSAL';

export const SetMsal = (value) => {
    return {
        type: SET_MSAL,
        payload: {
            value: value
        }
    }
}