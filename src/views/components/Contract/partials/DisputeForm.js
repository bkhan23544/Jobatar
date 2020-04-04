import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab, Box } from '@material-ui/core';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { proposalActions } from '../../../../common/redux/actions';
import FormValidator from '../../../../helpers/FormValidator';


class DisputeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                title: '',
                description: '',
                proposal_id: '',
                status: ''
            },
            open: false,
            item: null,
            submitted: false,
            validation: this.validator().valid(),
        };
    }

    componentWillMount(){
        this._mount();
    }

    componentWillReceiveProps() {
        this._mount();
    }

    _mount = () => {
        const { open, item } = this.props;
        let { formField } = this.state;
        if (item) {
            formField['proposal_id'] = item.id;
            this.setState({ id: item.id, open, item, formField });
        }
    }

    validator = () => {
        return new FormValidator([
            { field: 'title', method: 'isEmpty', validWhen: false, message: 'Title is required.' },
            { field: 'description', method: 'isEmpty', validWhen: false, message: 'Description is required.' },
        ]);
    };

    handleChange = (e) => {
        const { formField } = this.state;
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    handleClose = () => {
        this.props.disputeClose();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            const { dispatch } = this.props;
            const params = {};
            params.proposal_id = formField.proposal_id;
            params.title = formField.title;
            params.description = formField.description;
            dispatch(proposalActions.dispute("POST", { userItemProposalDispute: params }));
            this.setState(this.initializeState);
            this.handleClose();
        }
    };

    render() {
        const { open } = this.props;
        const { formField, submitted, validation } = this.state;
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
                <DialogTitle><span className="text-primary">Dispute</span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="review" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>

                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={formField.title} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />
                            {submitted && isValid.title.isInvalid &&
                                <div className="invalid-feedback"> {isValid.title.message} </div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                                <textarea placeholder="Description ..." onChange={this.handleChange}
                                name="description" rows={3} className={'form-control ' + (submitted && isValid.description.isInvalid ? 'is-invalid' : '')} />
                            {submitted && isValid.description.isInvalid &&
                                <div className="invalid-feedback"> {isValid.description.message} </div>
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

export default connect(mapStateToProps)(DisputeForm);