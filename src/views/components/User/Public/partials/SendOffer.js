import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';
import Select from 'react-select';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FormValidator from '../../../../../helpers/FormValidator';
import { proposalActions } from '../../../../../common/redux/actions';
import { globalService as gs, itemService } from '../../../../../common/services';

class SendOffer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                settlement: '',
                services: '',
                budget: '',
                comment: '',
                recipients: '',
                validation: this.validator().valid(),
            },
            open: false,
            servicesList: null,
            item: null,
            item_id: null
        };
    }

    componentDidMount() {
        const { servicesList } = this.state;
        (servicesList === null) && itemService.service("GET", null, { user_id: gs.identity.user.id })
            .then(response => (response.items && this.setState({ servicesList: response.items })))
            .catch(exception => {
                console.log(exception);
            });
    }

    componentWillReceiveProps() {
        const { open, item_id, item } = this.props;
        let formField = { ...this.state.formField };
        if (item){
            formField['settlement'] = item.settlement;
            this.setState({ open, item_id, item, formField });
        }
    }

    validator = () => {
        return new FormValidator([
            { field: 'settlement', method: 'isEmpty', validWhen: false, message: 'Service Settlement is required.' },
            { field: 'comment', method: 'isEmpty', validWhen: false, message: 'Description is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = (e.target.selectedOptions && e.target.name === 'settlement') ?
            Array.from(e.target.selectedOptions, (item) => item.value) :
            e.target.value;
        this.setState({ formField });
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { item_id, item, formField } = this.state;
        const validation = this.validator().validate(formField);
        let recipients = [];
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            const { dispatch, } = this.props;
            const params = {};
            params.budget = formField.budget;
            params.item_id = item_id;
            params.provider_id = gs.identity.user.id;
            params.action_by   = gs.identity.user.id;
            params.moduleId = 'common\\models\\UserService';
            params.comment = formField.comment;
            params.settlement = formField.settlement;
            params.services = formField.services && formField.services.map(item => item.value);
            params.recipients = [gs.identity.user.id, item.user_id];
            const param = (this.state.id === null) ? {item_id: item_id, provider_id: gs.identity.user.id } : { proposal_id: this.state.id };
            dispatch(proposalActions.proposal("POST", { userProposal: params }, param));
            this.setState(this.initializeState);
            this.handleClose();
        }
    };

    render() {

        const { open } = this.props;
        const { formField, item, servicesList } = this.state;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'sm'}
                className="offer-dialog">
                <DialogTitle><span className="text-primary">Send Offer for Service</span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="proposal" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                        {item && item.settlement === 'both' && <div className="form-group">
                            <div className="custom-control custom-radio mb-2">
                                <input type="radio"
                                    name="settlement"
                                    checked={(formField.settlement === 'cash')}
                                    id="settlement-cash" value={'cash'}
                                    onChange={this.handleChange}
                                    className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="settlement-cash">Service Cash</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio"
                                    name="settlement"
                                    checked={(formField.settlement === 'exchange')}
                                    id="settlement-exchange" value={'exchange'}
                                    onChange={this.handleChange}
                                    className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="settlement-exchange">Service Exchange</label>
                            </div>
                        </div> }

                        {(formField.settlement === 'cash') && <div className="form-group">
                            <label>Enter Amount</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name="budget" placeholder="Amount" onChange={this.handleChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text">$</span>
                                </div>
                            </div>
                        </div>}

                        {servicesList && (formField.settlement === 'exchange') && <div className="form-group">
                            <label>Select Services</label>
                            <Select
                                className="multiple-select mb-2"
                                classNamePrefix="multi"
                                isSearchable isMulti
                                defaultValue={formField.services}
                                name="services"
                                onChange={this.handleSelect}
                                options={servicesList.map(item => ({ value: item.id, label: item.title }))} />
                        </div>}

                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="form-control" placeholder="Message ..." onChange={this.handleChange}
                             name="comment" rows={3} />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions className="pb-3">
                    <Button variant="contained" color="primary" onClick={this.handleSubmit} autoFocus>Send Offer</Button>
                </DialogActions>
            </Dialog>)
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process,
    })
);

export default connect(mapStateToProps)(SendOffer);