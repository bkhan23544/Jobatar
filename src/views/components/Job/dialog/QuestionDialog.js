import React, {Component} from 'react';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, TextField
} from '@material-ui/core';

class QuestionDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            question: '',
            questions: [],
        };
        this.initializeState = this.state;
    }

    componentWillReceiveProps() {
        const {open, questions} = this.props;
        this.setState({open: open, questions: questions});
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({question: e.target.value});
    };

    handleQuestion = (e) => {
        e.preventDefault();
        if(this.state.question.length > 0) {
            this.setState({
                question: '',
                questions: [...this.state.questions, this.state.question]
            });
        }
    };

    handleClose = () => {
        this.setState({
            question: '',
        });
        this.props.onClose([]);
    };

    handleOk = () => {
        this.setState({
            question: '',
        });
        this.props.onClose(this.state.questions);
    };

    render() {
        const {question, questions} = this.state;
        const {open} = this.props;

        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'sm'}
                className="offer-dialog connection-dialog">
                <DialogTitle id="simple-dialog-title">Write a new question</DialogTitle>
                <DialogContent dividers>
                    <div className="peple-search">
                        <div className="input-group flex-nowrap">
                            <TextField name="question" variant="outlined" style={{paddingLeft: '10px', width: '100%'}}
                                       inputProps={{'aria-label': 'bare', 'placeholder': 'Type your question'}}
                                       value={question} onChange={this.onChange}/>
                            <div className="input-group-prepend">
                                <button className="btn btn-primary text-nowrap" onClick={this.handleQuestion} disabled={!question}>Add Question</button>
                            </div>
                        </div>
                    </div>
                    {questions && questions.length > 0 &&
                    <ul className={'question-list'}>{questions.map((item, index) => <li key={index}>{item}</li>)}</ul>}
                    {/*{(questions && questions.length === 0) && <div>Question not found</div>}*/}

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleOk} color="primary">Ok</Button>
                </DialogActions>
            </Dialog>
        );
    }
}


const processSelector = createSelector(
    state => state.process,
    process => process
);


const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process
    })
);

export default connect(mapStateToProps)(QuestionDialog);
