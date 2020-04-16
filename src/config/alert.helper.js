import { confirmAlert } from 'react-confirm-alert';
import { globalService as gs } from '../common/services';


const confirm = (message) => {
    if(message === "Check your email to complete the sign up process." ){
        confirmAlert({
            //title: 'Account has been created',
            message: message,
            buttons: [
                {
                    label: 'Close',
                    onClick: () => gs.navigation('login')
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: false,
        });
    }else{

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
    }
};

export const alertHelper = {
    confirm,
};