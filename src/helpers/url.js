const notifyUrl = (item) => {
    let url = '';
    switch (item.action) {
        case 'profile-update':
        case 'register':
        case 'change-email':
        case 'change-password':
        case 'deactivate-account':
        case 'block-user':
        case 'unblock-user':
        case 'password-reset-token':
        case 'upload-avatar':
        case 'upload-banner':
            url = '/dashBoard/user/update';
            break;
        case 'mail-chimp-newsletter':
            url = '/dashBoard/setting/stripe-connect';
            break;
        case 'create-job':
            url = '/dashBoard/jobs';
            break;
        case 'stripe-connect':
            url = '/dashBoard/setting/stripe-connect';
            break;
        case 'create-message':
            url = '/messages';
            break;
        case 'connection-pending':
            url = '/dashBoard/user/connection/received-request';
            break;
        case 'connection-accepted':
            url = '/dashBoard/user/connection/my-cofounder';
            break;
        case 'connection-deactivated':
            url = '/dashBoard/user/connection/sent-request';
            break;
        case 'alert-connect-stripe':
            url = '/dashBoard/user/update';
            break;
        case 'alert-verify-account':
            url = '/dashBoard/user/update';
            break;
        case 'connection-declined':
            url = '/dashBoard/user/connection/sent-request';
            break;
        case 'proposal-offers':
        case 'proposal-counter_offers':
        case 'proposal-accepted':
        case 'proposal-declined':
        case 'proposal-payment_confirm':
        case 'proposal-mark_as_completed':
        case 'proposal-completed':
        case 'proposal-not_completed':
        case 'proposal-dispute':
        case 'proposal-dispute_resolved':
        case 'proposal-rating_review':
        case 'proposal-refund-successful':
        case 'proposal-refund-unsuccessful':
        case 'proposal-payment_transfer':
        case 'proposal-payment_notify_to_admin':
        case 'proposal-refund':
        case 'milestone-new':
        case 'milestone-submission':
        case 'milestone-accepted':
        case 'milestone-declined':
        case 'milestone-payment':
        case 'timesheet-payment':
        case 'timesheet-new':
        case 'timesheet-submission':
        case 'timesheet-accepted':
        case 'timesheet-declined':
            url = `/contracts/view/${item.item_id}`;
            break;
        default:
            url = '/dashBoard/user/update';
    }
    return url;
};

export const urlHelper = {
    notifyUrl
};
