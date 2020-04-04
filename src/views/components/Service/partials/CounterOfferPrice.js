import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';

const CounterOfferPrice = (props) => {

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth={true}
            maxWidth={'sm'}
            className="offer-dialog"
        >
            <DialogTitle><span className="text-primary">Counter Offer Price</span>
                <Fab color="inherit" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </Fab>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enter Amount</label>
                        <div className="input-group">
                            <input type="number" className="form-control" placeholder="Amount" />
                            <div className="input-group-append">
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control" rows={3} defaultValue={""} />
                    </div>

                </form>
            </DialogContent>
            <DialogActions className="pb-3">
                <Button type="submit" variant="contained" color="primary" autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default CounterOfferPrice;