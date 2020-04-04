import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';
import Select from 'react-select';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FormValidator from '../../../../helpers/FormValidator';
import { proposalActions } from '../../../../common/redux/actions';

class ContractDeclined extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                comment: '',
                status: ''
            },
            open: false,
            item: null,
            validation: this.validator().valid(),
        };
    }

    componentWillMount() {
        this._mount();
    }

    componentWillReceiveProps() {
        this._mount();
    }

    _mount = () => {
        const { open, item } = this.props;
        let { formField } = this.state;
        if (item) {
            this.setState({ id: item.id, open, item, formField });
        }
    }

    validator = () => {
        return new FormValidator([
            { field: 'comment', method: 'isEmpty', validWhen: false, message: 'Decline reason is required.' },
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
        this.props.declinedClose();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            const { dispatch, } = this.props;
            const params = {};
            const param = { proposal_id: id };
            params.comment = formField.comment;
            params.status = 2;
            dispatch(proposalActions.proposal("POST", { userProposal: params }, param));
            this.setState(this.initializeState);
            this.handleClose();
        }
    };

    render() {

        const { open } = this.props;
        const { formField, item, servicesList,submitted, validation } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'sm'}
                className="offer-dialog">
                <DialogTitle><span className="text-primary">Decline Offer</span>
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
                                <label className="custom-control-label" htmlFor="settlement-cash">Cash</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio"
                                    name="settlement"
                                    checked={(formField.settlement === 'exchange')}
                                    id="settlement-exchange" value={'exchange'}
                                    onChange={this.handleChange}
                                    className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="settlement-exchange">Exchange</label>
                            </div>
                        </div>}

                        {(formField.settlement === 'cash') && <div className="form-group">
                            <label>Enter Amount</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name="price" placeholder="Amount" onChange={this.handleChange} />
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
                            {/*<label>Decline Reason</label>*/}
                            <textarea className={'form-control ' + (submitted && isValid.comment.isInvalid ? 'is-invalid' : '')} placeholder="Decline Reason" onChange={this.handleChange}
                                name="comment" rows={3} />
                                {submitted && isValid.comment.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.comment.message} </div>
                                }
                        </div>
                    </form>
                </DialogContent>
                <DialogActions className="pb-3">
                    <button className="btn btn-info" onClick={this.handleSubmit} autoFocus>Submit</button>
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

export default connect(mapStateToProps)(ContractDeclined);