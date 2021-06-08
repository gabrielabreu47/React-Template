import { ToastContainer, toast } from 'react-toastify';
const Swal = require('sweetalert2');

const operationSuccess = (title = '¡Excelente!', message = '¡Se ha realizado la operación con éxito!') => {
    Swal.fire(
        title,
        message,
        'success'
    )
}

const operationNotAllowed = (title = '¡Atención!', message = '¡Operación no permitida!') => {
    Swal.fire({
        icon: 'warning',
        title: title,
        text: message
    })
}

const operationFail = (title = '¡Atención!', message = '¡Ha ocurrido un error, intentelo nuevamente!') => {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message
    })
}

const operationSuccessToast = (text = "Operación realizada con exito") => toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export default { operationSuccess, operationNotAllowed, operationFail, successToast: { ToastContainer, operationSuccessToast } };