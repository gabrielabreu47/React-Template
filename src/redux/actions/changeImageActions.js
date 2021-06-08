export const CHANGE_IMAGE = 'CHANGE_IMAGE';

export const UpdateImage = (value) => {
    return {
        type: CHANGE_IMAGE,
        payload: {
            value: value
        }
    }
}