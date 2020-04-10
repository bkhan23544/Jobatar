const UserItem = "common\\models\\UserItem";
const UserService = "common\\models\\UserService";
const UserProfile = "common\\models\\UserProfile";
const UserItemProposal = "common\\models\\UserItemProposal";
const UserCoFounder = "common\\models\\UserCoFounder";
const UserConnection = "common\\models\\UserConnection";
const statuses = () => {
    return {
        status_pending: 0,
        status_declined: 2,
        status_accepted: 1,
        status_bid: 11,
        status_offers: 3,
        status_counter_offers: 9,
        status_payment_confirm: 4,
        status_mark_as_completed: 5,
        status_not_completed: 6,
        status_completed: 7,
        status_accepted_and_closed: 8
    }
};

const moduleClass = (moduleType) => {
    let module;
    switch (moduleType) {
        case UserItem:
            module = "UserItem";
            break;
        case UserService:
            module = "UserService";
            break;
        case UserConnection:
            module = "UserConnection";
            break;
        default:
            module = 'All';
    }
    return module;
}

const moduleName = (moduleType) => {
    let module;
    switch (moduleType) {
        case "UserItem":
            module = UserItem;
            break;
        case "UserService":
            module = UserService;
            break;
        case "UserConnection":
            module = UserConnection;
            break;
        default:
            module = 'All';
    }
    return module;
}

const moduleTitle = (module) => {
    let title;
    switch (module) {
        case UserItem:
            title = "Jobs";
            break;
        case UserService:
            title = "Services";
            break;
        case UserConnection:
            title = "Connection";
            break;
        default:
            title = 'All';
    }
    return title;
}


export const ModuleHelper = {
    UserItem,
    UserService,
    UserProfile,
    UserItemProposal,
    UserCoFounder,
    UserConnection,
    statuses,
    moduleClass,
    moduleName,
    moduleTitle
};
