import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FormValidator from '../../../../helpers/FormValidator'



class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                title: '',
                text: '',
                recipient_id: [],
                item_id: '',
                module: '',
                attachment: '',
                group: null,
            },
            validation: this.validator().valid(),
            open: false,
            item: null,
            messageKey: null,
            submitted: false,
        };
    }
    componentWillMount(){
        this._mount();
    }

    componentWillReceiveProps() {
        this._mount();
    }

    _mount = () => {
        const { open, item, module, messageKey } = this.props;
        let { formField } = this.state;
        if (item) {
            formField['item_id'] = item.id;
            formField['module'] = module;
            formField['title'] = item.item.title;
            formField['recipient_id'] = item.userItemProposalRecipients.map(item => item.recipient_id);
            this.setState({ id: item.id, item, open, formField, messageKey });
        }
    }

    validator = () => {
        return new FormValidator([
            { field: 'title', method: 'isEmpty', validWhen: false, message: 'Title is required.' },
            { field: 'text', method: 'isEmpty', validWhen: false, message: 'Message is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleClose = () => {
        this.props.messageClose();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            /*
                const params = {};
                params.text = formField.text;
                params.recipient_id = formField.recipient_id;
                params.group = { group_id: formField.item_id, title: formField.title, image_id: item.item.cover_id, image: item.item.cover };
                params.item = { item_id: formField.item_id, module: formField.module };
                dispatch(messageActions.sendMessageToFirebase(params, messageKey));
            */
            this.props.message(formField.text, formField.title);
            this.setState(this.initializeState);
            this.handleClose();
        }
    };

    render() {

        const { open } = this.props;
        const { formField, item, submitted, validation } = this.state;
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
                <DialogTitle><span className="text-primary">Send Message</span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="proposal" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                        {item && item.item && <div className="form-group">
                            <label>Subject</label>
                            <div className="input-group">
                                <input type="text" value={formField.title} name="title" placeholder="Title ..." onChange={this.handleChange} className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />
                                {submitted && isValid.title.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.title.message} </div>
                                }
                            </div>
                        </div>}
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className={'form-control ' + (submitted && isValid.text.isInvalid ? 'is-invalid' : '')} placeholder="Message ..." onChange={this.handleChange}
                                name="text" rows={3} />
                            {submitted && isValid.text.isInvalid &&
                                <div className="invalid-feedback"> {isValid.text.message} </div>
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

export default connect(mapStateToProps)(MessageForm);