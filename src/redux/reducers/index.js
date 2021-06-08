import { combineReducers } from 'redux';
import user from './userReducer';
import loading from './loadingReducer';
import isLoggedIn from './isLoggedInReducer';
import changeImage from './chageImageReducer';
import opeationSuccess from './operationSuccessRedurer';

export default combineReducers({
    user,
    loading,
    isLoggedIn,
    changeImage,
    opeationSuccess
});