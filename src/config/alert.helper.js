import { confirmAlert } from 'react-confirm-alert';

const confirm = (message) => {
    confirmAlert({
        //title: 'Account has been created',
        message: message,
        buttons: [
            {
                label: 'Close',
                onClick: () => console.log('Click No')
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: false,
    });
};

export const alertHelper = {
    confirm,
};