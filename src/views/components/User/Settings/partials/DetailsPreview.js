import React, { Component, Fragment } from 'react';
import Select from "react-select";
import Card from "react-bootstrap/esm/Card";
import InputMask from "react-input-mask";
import mccList from "../../../../../common/utils/mcc";
import Form from "react-bootstrap/esm/Form";

class DetailsPreview extends Component {
    render() {
        return (<Fragment>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Account Currency <br />(Only 3 char code)</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>
            <div className="form-group row mb-0">
                <label className="col-sm-3 col-form-label">Routing Number</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>
            <div className="py-3 w-100 float-left border-bottom mb-3">
                <Card.Title className="mb-0">Account Holder Information</Card.Title>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Id Number (SSN)</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Account Number</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Name on Account</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Address</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">City</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">State </label>  {/*(Only 2 Char Code)*/}
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Postal Code</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Phone Number</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Date Of Birth (MM/DD/YYYY)</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Industry</label>
                <div className="col-sm-8">
                    <input type="text" readOnly className="form-control-plaintext" value="email@example.com" />
                </div>
            </div>

        </Fragment>)
    }
}

export default DetailsPreview;