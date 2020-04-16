// import React, { Component } from 'react';
// import { createSelector } from "reselect";
// import { connect } from "react-redux";
// import { Card, Row, Col } from 'react-bootstrap';
// import LaddaButton, { EXPAND_RIGHT } from 'react-ladda';
// import { Main } from '../../../layout';
// import { DocumentTitle } from '../../../../helpers/DocumentTitle';
// import FormValidator from '../../../../helpers/FormValidator';
// import { itemService, globalService as gs } from '../../../../common/services';
// import { alertSelectors } from '../../../../common/redux/selectors';

// class Dashboard extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             formField: {
//                 subject: '',
//                 comment: '',
//             },
//             submitted: false,
//             validation: this.validator().valid(),
//         };
//         this.initializeState = this.state;
//     }

//     validator = () => {
//         return new FormValidator([
//             { field: 'subject', method: 'isEmpty', validWhen: false, message: 'Subject is required.' },
//             { field: 'comment', method: 'isEmpty', validWhen: false, message: 'Comment is required.' },
//         ]);
//     };

//     handleChange = (e) => {
//         let formField = { ...this.state.formField };
//         formField[e.target.name] = e.target.value;
//         this.setState({ formField });
//     };
//     handleSubmit = (e) => {
//         e.preventDefault();
//         const validation = this.validator().validate(this.state.formField);
//         this.setState({ validation, submitted: true });

//         if (validation.isValid) {
//             const { formField } = this.state;
//             const { dispatch } = this.props;
//             const formValue = {
//                 userSupport: {
//                     text: formField.comment,
//                     info: {
//                         subject: formField.subject,
//                         status: 'Open'
//                     },
//                 }
//             };
//             itemService.support("POST", formValue).then((data) => {
//                 this.setState(this.initializeState);
//                 dispatch(alertSelectors.success('Thank you for contacting us. We will respond to you as soon as possible.'));
//             }).catch(exception => {
//                 gs.showErrors(dispatch, exception, alertSelectors);
//             });
//         }

//     };

//     render() {
//         const { formField, submitted, validation } = this.state;
//         let isValid = submitted ? this.validator().validate(formField) : validation;
//         const { process } = this.props;

//         return (<Main>
//             <DocumentTitle title={`Profile Details`} />

//             <div className="update-profile supportPage bg-body" style={{ minHeight: 'calc(100vh - 342px)' }}>
//                 <div className="container">
//                     <Card className="mb-4 mb-lg-5">
//                         <Card.Header>Support</Card.Header>
//                         <Card.Body>
//                             {/* <Card.Title>Coming Soon</Card.Title> */}

//                             <form name="service" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
//                                 <Row>
//                                     {/* <Col xs md="6">
//                                         <div className="form-group">
//                                             <label>Title</label>
//                                             <input type="text" placeholder="Enter Title"
//                                                 name="title" value={formField.title}
//                                                 onChange={this.handleChange}
//                                                 className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')}/>
//                                             {submitted && isValid.title.isInvalid &&
//                                                 <div className="invalid-feedback"> {isValid.title.message} </div>
//                                             }
//                                         </div>
//                                     </Col> */}
//                                     <Col xs="12">
//                                         <div className="form-group">
//                                             <label>Subject</label>
//                                             <input type="text" placeholder="Enter Subject"
//                                                 name="subject" value={formField.subject}
//                                                 onChange={this.handleChange}
//                                                 className={'form-control ' + (submitted && isValid.subject.isInvalid ? 'is-invalid' : '')} />
//                                             {submitted && isValid.subject.isInvalid &&
//                                                 <div className="invalid-feedback"> {isValid.subject.message} </div>
//                                             }
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Comment</label>
//                                             <textarea placeholder="Enter Comment" style={{ minHeight: '120px' }}
//                                                 name="comment" value={formField.comment}
//                                                 onChange={this.handleChange}
//                                                 className={'form-control ' + (submitted && isValid.comment.isInvalid ? 'is-invalid' : '')} >
//                                             </textarea>
//                                             {submitted && isValid.comment.isInvalid &&
//                                                 <div className="invalid-feedback"> {isValid.comment.message} </div>
//                                             }
//                                         </div>
//                                         <div className="form-group">
//                                             <LaddaButton type="submit" className="col-lg-2 btn btn-info btn-lg" loading={process.loading ? true : false} data-style={EXPAND_RIGHT}>Submit</LaddaButton>
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </form>

//                         </Card.Body>
//                     </Card>
//                 </div>
//             </div>

//         </Main>);
//     }
// }

// const processSelector = createSelector(
//     state => state.process,
//     process => process
// );

// const authenticationSelector = createSelector(
//     state => state.authentication,
//     authentication => authentication
// );

// const mapStateToProps = createSelector(
//     processSelector,
//     authenticationSelector,
//     (process, authentication) => ({
//         process, authentication
//     })
// );

// export default connect(mapStateToProps)(Dashboard);