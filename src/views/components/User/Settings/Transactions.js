import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Select from "react-select";
import { Main } from '../../../layout';
import Pagination from '../../../../helpers/Pagination';
import {Table, TableHead, TableRow, TableCell, TableBody,Paper,TableContainer,makeStyles} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { itemService } from "../../../../common/services";
import { DocumentTitle } from "../../../../helpers/DocumentTitle";
import { Col, Row } from "react-bootstrap";
import NavBar from "./partials/NavBar";
import Card from "react-bootstrap/esm/Card";



const styles = theme => ({
    table: {
      minWidth: 50,
    },
  });

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                startDate: null,
                endDate: null,
                sort: '',
            },
            transactions: null,
            loading: false,
            page: 1,
            pagesize: 20,
            submitted: false,
        };
    }

    componentWillMount() {

    }

    handleDateChange = (name, fulldate, date) => {
        const formField = { ...this.state.formField };
        formField[name] = date;
        this.setState({ formField });
        console.log(this.state);
    };

    handleAll = (item, { action, name }) => {
        const formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    onChangePage = (page) => {
        itemService.transactions("GET", { 'per-page': 20, page: page }).then(response => {
            //console.log('Responce', response);
            this.setState({ transactions: response });
        });
    };

    render() {
        const { formField, transactions } = this.state;
        let results = (transactions && transactions.items) ? transactions.items : null;
        let pagination = (transactions && transactions.pagination) ? transactions.pagination : null;
        const { classes } = this.props;

        return (
            // <Main>
            <>
                <DocumentTitle title={`My Transactions`} />
                <div className="update-profile bg-body pt-5 col-lg-9 col-sm-12">
                    <div className="">
                        {/*<div className="print text-right">*/}
                        {/*<Link className="btn btn-info mr-2" to={`/setting/account-info`}>Back</Link>*/}
                        {/*<button className="btn btn-primary">Print</button>*/}
                        {/*</div>*/}
                        <div className="card">
                            {/*<div className="card-header d-flex align-items-center">
                                <h1 className="mb-0 pb-0 col pl-0">My Transactions</h1>
                                <div className="action d-flex align-items-center justify-content-center flex-wrap">*/}
                            {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                            {/*<div className="date">*/}
                            {/*<KeyboardDatePicker*/}
                            {/*format="MM/dd/yyyy"*/}
                            {/*margin="normal"*/}
                            {/*inputVariant="outlined"*/}
                            {/*id="start-date"*/}
                            {/*name="startDate"*/}
                            {/*label="Start Date"*/}
                            {/*maxDate={new Date()}*/}
                            {/*value={formField.startDate}*/}
                            {/*onChange={this.handleDateChange.bind(this, 'startDate')}*/}
                            {/*/>*/}
                            {/*</div>*/}
                            {/*<div className="date">*/}
                            {/*<KeyboardDatePicker*/}
                            {/*format="MM/dd/yyyy"*/}
                            {/*margin="normal"*/}
                            {/*inputVariant="outlined"*/}
                            {/*id="end-date"*/}
                            {/*name="endDate"*/}
                            {/*label="End Date"*/}
                            {/*value={formField.endDate}*/}
                            {/*onChange={this.handleDateChange}*/}
                            {/*KeyboardButtonProps={{*/}
                            {/*'aria-label': 'change date',*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*</div>*/}
                            {/*</MuiPickersUtilsProvider>*/}
                            {/*<div className="sort">*/}
                            {/*<Select*/}
                            {/*className="multiple-select"*/}
                            {/*classNamePrefix="multi"*/}
                            {/*placeholder="Sort By"*/}
                            {/*name="sort"*/}
                            {/*onChange={this.handleAll}*/}
                            {/*options={[{ value: "id", label: "Ascending" }, { value: "-id", label: "Descending" }]} />*/}
                            {/*</div>*/}
                            {/*</div>
                            </div>*/}
                        <Card.Header>My Transactions</Card.Header>
                        <div className="card-body">
                            <Row>
                                <Col xs="12" md="3" xl="3">
                                    <NavBar/>
                                </Col>
                                <Col xs="12" md="9" xl="9" className="add-stripe-account">
                                <div className="on-icon">
                                       <p className="pay-title">My Transactions</p>
                                       </div>
                                    {/* <Table aria-label="simple table" className="mb-4 border" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Transaction ID</TableCell>
                                                <TableCell>Transaction Date</TableCell>
                                                <TableCell>Contract Name</TableCell>
                                                <TableCell>Admin Fee</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Transfer</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(results && results.length === 0) && <TableRow>
                                                <TableCell colSpan={5}>
                                                    <div
                                                        className="common-not-found d-flex align-items-center justify-content-center">
                                                        <div className="inner text-center">
                                                            <figure>
                                                                <img src="/images/not-found/My-Transactions.png"
                                                                     alt="Image" width="100"/>
                                                            </figure>
                                                            <h5>YOU DON’T HAVE ANY TRANSACTION YET</h5>
                                                            <p className="title">This is where you’ll be able to track
                                                                all your transactions</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{moment(item.created_at * 1000).format('LLL')}</TableCell>
                                                    <TableCell>{item.proposal.item.title}</TableCell>
                                                    <TableCell>${item.admin_fee}</TableCell>
                                                    <TableCell>${item.total_amount}</TableCell>
                                                    <TableCell>${item.transfer_amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table> */}
 <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" className="table-text">Transaction ID</TableCell>
            <TableCell align="right" className="table-text">Transaction Date</TableCell>
            <TableCell align="right" className="table-text">Contract Name</TableCell>
            <TableCell align="right" className="table-text">Admin Fee</TableCell>
            <TableCell align="right" className="table-text">Amount</TableCell>
            <TableCell align="right" className="table-text">Transfer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(results && results.length === 0) && <TableRow>
              <TableCell colSpan={5}>
              <div
                                                        className="common-not-found d-flex align-items-center justify-content-center">
                                                        <div className="inner text-center">
                                                            <figure>
                                                                <img src="/images/not-found/My-Transactions.png"
                                                                     alt="Image" width="100"/>
                                                            </figure>
                                                            <h5>YOU DON’T HAVE ANY TRANSACTION YET</h5>
                                                            <p className="title">This is where you’ll be able to track
                                                                all your transactions</p>
                                                        </div>
                                                    </div>
              </TableCell>
            </TableRow>}

{results && results.map(item => (
    <TableRow key={item.id}>
        <TableCell component="th" scope="row">
            {item.transactionID}
        </TableCell>
        <TableCell>{moment(item.created_at * 1000).format('LLL')}</TableCell>
        <TableCell>{item.proposal.item.title}</TableCell>
        <TableCell>${item.admin_fee}</TableCell>
        <TableCell>${item.total_amount}</TableCell>
        <TableCell>${item.transfer_amount}</TableCell>
    </TableRow>
))}
          
        </TableBody>
      </Table>
    </TableContainer>




                                    <Pagination className="justify-content-center"
                                                pageSize={pagination && pagination.pageSize}
                                                totalCount={(pagination && pagination.pageCount) ? pagination.pageCount : 1}
                                                onChangePage={this.onChangePage}/>
                                </Col>
                            </Row>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        // </Main>
        );
    }
}

export default withStyles(styles)(Transactions);