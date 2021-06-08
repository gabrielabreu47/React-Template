import moment from 'moment';
import { toast } from 'react-toastify';
const querystring = require('querystring');

const convertDate = object => moment(object).format("DD/MM/YYYY")

const getYearsFromDate = date => moment().diff(date, 'years',false);

const isOnlyNumbers = value => /^\d+$/.test(value);

const convertToQueryString = object => querystring.stringify(object);

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const successNotify = (text = "Operación realizada con exito") => toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const validateUpdate = async (history) => {
    await timeout(500);
    if (history && history.location && history.location.state && history.location.state.hasOwnProperty('updateUserData')) {
        history.location.state = {};
        successNotify();
    }
}

export default { convertDate, isOnlyNumbers, convertToQueryString, getYearsFromDate, validateUpdate };

