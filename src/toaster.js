import { toast } from 'react-toastify';

const SuccessNotification = (text = 'Operación realizada con exito') => toast.info(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export { SuccessNotification };