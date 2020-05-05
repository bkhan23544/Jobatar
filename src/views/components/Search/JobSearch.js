import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { createSelector } from "reselect";
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import Pagination from '../../../helpers/Pagination';
import { Main } from '../../layout';
import { defaultActions, searchActions } from '../../../common/redux/actions';
import { JobListing } from './partials';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { ExpansionPanelDetails } from '@material-ui/core';
import { ExpansionPanelSummary } from '@material-ui/core';
import { ExpansionPanel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
// import "../../../ali.scss"

class JobSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                name: "",
                settlement: '',
                categories: [],
                countries: null,
                budget: "0",
                proposal_count: "0",
                sort: null,
            },
            pagesize: 10,
            page: 1,
        };
        this.initializeState = this.state;
        this.props.history.listen((location, action) => {
            const { dispatch } = this.props;
            if (location && location.search) {
                let search = new URLSearchParams(location.search);
                dispatch(searchActions.jobs("GET", { name: search.get("name") }));
            }
        });
    }

    onResetForm = (e) => {
        e.preventDefault();
        const { history } = this.props;
        this.setState(this.initializeState);
        this.listObj.value = null;
        history.push('/job-search');
        this.props.dispatch(searchActions.jobs("GET", { pagesize: 5, page: 1 }));

    };

    componentWillMount() {
        const { dispatch, categories, countries } = this.props;
        Object.getOwnPropertyNames(categories).length === 0 && dispatch(defaultActions.categories());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        if (this.props.location && this.props.location.search) {
            let search = new URLSearchParams(this.props.location.search);
            this.setState({ formField: { name: search.get("name") } });
        }
    }

    componentDidMount() {
        this.search();
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(searchActions.clear());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location && nextProps.location.search) {
            let search = new URLSearchParams(nextProps.location.search);
            let formField = { ...this.state.formField };
            formField['name'] = search.get("name");
            this.setState({ formField });
            //this.setState({ formField: {name: search.get("name")} });
        }
    }

    handleChange = (e) => {
        //const { history } = this.props;
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
        //history.push('/job-search?name=' + e.target.value);
    };

    handleAll = (item, { action, name }, ev) => {
        const formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField }, () => this.search());
    };

    RadioButtonChanger = (ev, item) => {
        const formField = { ...this.state.formField };
        formField[ev.target.name] = ev.target.value;
        console.log(ev.target.name, ev.target.value)
        this.setState({ formField }, () => this.search());
    }

    onChangePage = (page) => {
        const formField = { ...this.state.formField };
        formField["page"] = page;
        this.setState({ formField }, () => this.search());
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;
        history.push('/job-search?name=' + this.state.formField.name);
        //this.search();
    };

    noRecords = () => {
        return (
            <span className='norecord'> No Category Available</span>
        );
    };

    onChangeCategory = (event) => {
        const formField = { ...this.state.formField };
        formField["categories"] = event.value;
        this.setState({ formField }, () => this.search());
    };

    onSelectCategory = (event) => {
        //console.log(event.itemData);
    };

    onCloseCategory = (event) => {
        console.log(event);
    };

    search = () => {
        const { formField, page, pagesize } = this.state;
        const { dispatch } = this.props;
        let params = {};
        params.name = formField.name;
        params.category_id = (formField.categories && formField.categories.length > 0) ? formField.categories : null;
        params.country_code = (formField.countries && formField.countries.value) ? formField.countries.value : "";
        params.settlement = formField.settlement;
        params.budget = formField.budget;
        params.proposal_count = formField.proposal_count;
        params.sort = (formField.sort && formField.sort.value) ? formField.sort.value : "";
        params.pagesize = 5;
        params.page = page;
        dispatch(searchActions.jobs("GET", params));
    };

    filterToggle = (id) => {
        document.getElementById(id).classList.toggle("section1MobOpen")
    }

    // map the groupBy field with category column
    fields = { groupBy: 'parent', text: 'name', value: 'id' };

    render() {
        const { categories, countries, search, history } = this.props;
        const { formField, pagesize } = this.state;
        let categoriesArr = categories.data ? categories.data : [];
        let countriesArr = countries.data ? countries.data : [];
        let results = search.jobs ? search.jobs : null;
        let catlist = categoriesArr.filter(item => (item.parent_id !== null));
        // console.log(catlist.length ? catlist[1].parent : "a")

        return (<Main history={history}>
            <DocumentTitle title={'Job Search'} />
            {/* <div className="freLncrSarch bg-body">
                <div className="container">
                    <div id="section1" className="section1 section1MobClose">
                        <div className="row">
                            <div className="col-12"> */}
            {/* <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                    <div className="any-search mb-3 mb-lg-4">
                                        <div className="input-group">
                                            <input type="text" className="form-control" onChange={this.handleChange} value={formField.name} name="name" placeholder="Search by Skill, Job title" />
                                            <div className="input-group-prepend">
                                                <button className="btn btn-info" type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
            {/* <div className="filters card mb-4">
                                    <div className="card-body">
                                        <div className="clearIcon" style={{ width: "100%", height: "30px" }}>
                                            <CancelIcon onClick={() => this.filterToggle("section1")}
                                                style={{ float: "right", color: "red" }} />
                                        </div>
                                        <div className="align-items-center">
                                            <div className="w-100">
                                                <div className="d-flex align-items-center flex-wrap custom-row">
                                                    <Select
                                                        className="multiple-select payment"
                                                        classNamePrefix="multi"
                                                        name="settlement"
                                                        isClearable
                                                        value={formField.settlement}
                                                        placeholder="Payment Type"
                                                        onChange={this.handleAll}
                                                        options={[{ value: "cash", label: "Cash" }, { value: "exchange", label: "Exchange" }, { value: "both", label: "Both" }]} />

                                                    <div className={'category'} style={{ width: '100%', paddingTop: '4px', paddingLeft: 5, paddingRight: 5 }}>
                                                        <MultiSelectComponent
                                                            id="mtselement"
                                                            cssClassNamclassName={'multi-droupdown'}
                                                            popupHeight='200px'
                                                            fields={this.fields}
                                                            value={formField.categories}
                                                            dataSource={catlist}
                                                            placeholder="Select a Category"
                                                            mode="CheckBox"
                                                            enableGroupCheckBox="true"
                                                            allowFiltering="true"
                                                            ref={(dropdownlist) => { this.listObj = dropdownlist; }}
                                                            filterBarPlaceholder="Search Category"
                                                            change={this.onChangeCategory}
                                                            select={this.onSelectCategory}
                                                            close={this.onCloseCategory}
                                                            showDropDownIcon={true}
                                                            noRecordsTemplate={this.noRecords}>
                                                            <Inject services={[CheckBoxSelection]} />
                                                        </MultiSelectComponent>
                                                    </div> */}

            {/*<Select*/}
            {/*className="multiple-select category"*/}
            {/*classNamePrefix="multi"*/}
            {/*isSearchable*/}
            {/*isMulti*/}
            {/*name="categories"*/}
            {/*value={formField.categories}*/}
            {/*placeholder="Category"*/}
            {/*onChange={this.handleAll}*/}
            {/*options={categoriesArr.map(item => ({ value: item.id, label: item.name }))} />*/}

            {/* <Select
                                                        className="multiple-select budget"
                                                        classNamePrefix="multi"
                                                        isClearable
                                                        name="budget"
                                                        value={formField.budget}
                                                        placeholder="Budget"
                                                        onChange={this.handleAll}
                                                        options={[
                                                            { value: "0", label: "Any Number of budget" },
                                                            { value: "1", label: "Less than $10" },
                                                            { value: "2", label: "$10-$50" },
                                                            { value: "3", label: "$50-$100" },
                                                            { value: "4", label: "$100-$500" },
                                                            { value: "5", label: "$500-$1k" },
                                                            { value: "6", label: "$1k-$5k" },
                                                            { value: "7", label: "$5k+" }
                                                        ]} />
                                                    <Select
                                                        className="multiple-select ratings"
                                                        classNamePrefix="multi"
                                                        isClearable
                                                        value={formField.proposal_count}
                                                        name="proposal_count"
                                                        placeholder="Number of Proposals"
                                                        onChange={this.handleAll}
                                                        options={[
                                                            { value: "0", label: "Any Number of proposals" },
                                                            { value: "1", label: "Less than 10" },
                                                            { value: "2", label: "11 to 50" },
                                                            { value: "3", label: "51 to 100" },
                                                            { value: "4", label: "101 to 200" },
                                                            { value: "5", label: "Above 200" }]} />
                                                    <Select
                                                        className="multiple-select"
                                                        classNamePrefix="multi"
                                                        isClearable
                                                        isSearchable
                                                        value={formField.countries}
                                                        name="countries"
                                                        onChange={this.handleAll}
                                                        placeholder="Country"
                                                        options={countriesArr.map(item => ({ value: item.code, label: item.name }))} />

                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="font-weight-bold btn btn-link text-info text-nowrap" type="button" onClick={this.onResetForm}>Reset Filters</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="row">
                            <form style={{ width: "100%" }} name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                <div style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }} className="any-search mb-3 mb-lg-4">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={this.handleChange} value={formField.name} name="name" placeholder="Search by Skill, Job title" />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-info" type="submit">Search</button>
                                        </div>
                                    </div>
                                    <p onClick={() => this.filterToggle("section1")}>Advance Filter</p>
                                </div>
                            </form>
                            <div className="col-12 sorting mb-3 d-flex align-items-center">
                                <h6 className="col pl-0 mb-0">
                                    {(results && results.pagination && results.pagination.totalCount > 0) && `${results.pagination.totalCount} Search result found.`}
                                    {(results && results.length === 0) && 'No search result found.'}
                                </h6> */}
            {/*
                                <div className="sort">
                                    <Select
                                        className="multiple-select"
                                        classNamePrefix="multi"
                                        name="sort"
                                        value={formField.sort}
                                        placeholder="Sort By"
                                        onChange={this.handleAll}
                                        options={[{ value: "id", label: "Most Recent" }]} />
                                </div>
                            */}
            {/* </div>
                        </div>
                        <JobListing results={results} />
                        <div className="col-12">
                            <Pagination className="justify-content-end"
                                pageSize={pagesize}
                                totalCount={(results && results.pagination && results.pagination.totalCount) ? results.pagination.totalCount : 10}
                                onChangePage={this.onChangePage} />
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="featured-users">
                <div className="container">
                    <div className="section-title">
                        <h1>Jobs</h1>
                    </div>
                    <div className="row reverseDirection">

                        <div className="col-lg-9">
                            <div className="work">
                                <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                    <div className="any-search mb-3 mb-lg-4">
                                        <div className="input-group headerInput">
                                            <input type="text" className="form-control" onChange={this.handleChange} value={formField.name} name="name" placeholder="Search by Skill, Job title" />
                                            <div className="input-group-prepend">
                                                <button className="btn btn-info" type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <JobListing results={results} />
                                <div className="paginationCommon blogPagination text-center">
                                    <Pagination className=""
                                        pageSize={pagesize}
                                        totalCount={(results && results.pagination && results.pagination.totalCount) ? results.pagination.totalCount : 10}
                                        onChangePage={this.onChangePage} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 col-xl-3 col-lg-3">
                            <div className="widget">
                                <div className="filterHead">
                                    <h6 className="col pl-0 mb-0 text-left">
                                        <span>
                                        {(results && results.pagination && results.pagination.totalCount > 0) && `${results.pagination.totalCount} Search result found.`}
                                        {(results && results.length === 0) && 'No search result found.'}
                                        </span>
                                    </h6>
                                    <button style={{ color: "red !important" }} className="font-weight-bold btn btn-link text-info text-nowrap" type="button" onClick={this.onResetForm}>Reset Filters</button>
                                </div>
                                {/* <h3 className="widget_title">Category</h3> */}
                                {/* <ul className="tr-list">
                                    <li><a href="" className="active"><i className="fa fa-code"></i> Web & Mobile Development</a></li>
                                    <li><a href=""><i className="fa fa-eye"></i>  Design, Arts & Multimedia</a></li>
                                    <li><a href=""><i className="fa fa-edit"></i>  Writing & Translation</a></li>
                                    <li><a href=""><i className="fa fa-cog"></i>  Admin Support</a></li>
                                    <li><a href=""><i className="fa fa-table"></i>  Management & Finance</a></li>
                                    <li><a href=""><i className="fa fa-bullhorn"></i>  Sales & Marketing</a></li>
                                </ul> */}
                                {/* <div className="expensionPannel">
                                    {catlist.length ? catlist.map((obj, i) => {
                                        return (
                                            catlist[i + 1] ?
                                                obj.parent !== catlist[i + 1].parent ?
                                                    <ExpansionPanel defaultExpanded>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <p>{obj.parent}</p>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <div className={'category'} style={{ width: '100%', paddingTop: '4px', paddingLeft: 5, paddingRight: 5 }}>
                                                                <MultiSelectComponent
                                                                    id="mtselement"
                                                                    cssClassNamclassName={'multi-droupdown'}
                                                                    popupHeight='200px'
                                                                    fields={this.fields}
                                                                    value={formField.categories}
                                                                    dataSource={catlist}
                                                                    placeholder="Select a Category"
                                                                    mode="CheckBox"
                                                                    enableGroupCheckBox="true"
                                                                    allowFiltering="true"
                                                                    // ref={(dropdownlist) => { this.listObj = dropdownlist; }}
                                                                    // filterBarPlaceholder="Search Category"
                                                                    // change={this.onChangeCategory}
                                                                    // select={this.onSelectCategory}
                                                                    // close={this.onCloseCategory}
                                                                    // showDropDownIcon={true}
                                                                    noRecordsTemplate={this.noRecords}>
                                                                    <Inject services={[CheckBoxSelection]} />
                                                                </MultiSelectComponent>
                                                            </div>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                    : null
                                                : null
                                        )
                                    }) : null}
                                </div> */}
                                <div className="categoryDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <p>Categories</p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div className={'category'} style={{ width: '100%', paddingTop: '4px', paddingLeft: 5, paddingRight: 5 }}>
                                                <MultiSelectComponent
                                                    id="mtselement"
                                                    cssClassNamclassName={'multi-droupdown'}
                                                    popupHeight='500px'
                                                    fields={this.fields}
                                                    value={formField.categories}
                                                    dataSource={catlist}
                                                    placeholder="Select a Category"
                                                    mode="CheckBox"
                                                    enableGroupCheckBox="true"
                                                    allowFiltering="true"
                                                    ref={(dropdownlist) => { this.listObj = dropdownlist; }}
                                                    filterBarPlaceholder="Search Category"
                                                    change={this.onChangeCategory}
                                                    select={this.onSelectCategory}
                                                    close={this.onCloseCategory}
                                                    showDropDownIcon={true}
                                                    noRecordsTemplate={this.noRecords}>
                                                    <Inject services={[CheckBoxSelection]} />
                                                </MultiSelectComponent>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>

                                <div className="paymentDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className="top"
                                        >
                                            <p>Payment Type</p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="settlement" value={formField.settlement}
                                                    name="settlement"
                                                    onChange={(ev) => this.RadioButtonChanger(ev)} >
                                                    <FormControlLabel value="" control={<Radio />} label="Both" />
                                                    <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                                    <FormControlLabel value="exchange" control={<Radio />} label="Exchange" />
                                                </RadioGroup>
                                            </FormControl>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>

                                <div className="budgetDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className="top"
                                        >
                                            <p>Job Type </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="proposal_count" value={formField.proposal_count}
                                                    name="proposal_count"
                                                // onChange={(ev) => this.RadioButtonChanger(ev)} 
                                                >
                                                    {[
                                                        { value: "0", label: "Any Job" },
                                                        { value: "1", label: "Fixed" },
                                                        { value: "2", label: "Hourly" }].map((a) => {
                                                            return (
                                                                <FormControlLabel value={a.value} control={<Radio size="small" />} label={a.label} />
                                                            )
                                                        })}
                                                </RadioGroup>
                                            </FormControl>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>

                                </div>

                                <div className="budgetDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className="top"
                                        >
                                            <p>Budget </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="budget" value={formField.budget}
                                                    name="budget"
                                                    onChange={(ev) => this.RadioButtonChanger(ev)} >
                                                    {[
                                                        { value: "0", label: "Any budget" },
                                                        { value: "1", label: "Less than $10" },
                                                        { value: "2", label: "$10-$50" },
                                                        { value: "3", label: "$50-$100" },
                                                        { value: "4", label: "$100-$500" },
                                                        { value: "5", label: "$500-$1k" },
                                                        { value: "6", label: "$1k-$5k" },
                                                        { value: "7", label: "$5k+" }
                                                    ].map((a) => {
                                                        return (
                                                            <FormControlLabel value={a.value} control={<Radio size="small" />} label={a.label} />
                                                        )
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>

                                </div>

                                <div className="budgetDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className="top"
                                        >
                                            <p>Number of Proposals </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="proposal_count" value={formField.proposal_count}
                                                    name="proposal_count"
                                                    onChange={(ev) => this.RadioButtonChanger(ev)} >
                                                    {[
                                                        { value: "0", label: "Any Number of proposals" },
                                                        { value: "1", label: "Less than 10" },
                                                        { value: "2", label: "11 to 50" },
                                                        { value: "3", label: "51 to 100" },
                                                        { value: "4", label: "101 to 200" },
                                                        { value: "5", label: "Above 200" }].map((a) => {
                                                            return (
                                                                <FormControlLabel value={a.value} control={<Radio size="small" />} label={a.label} />
                                                            )
                                                        })}
                                                </RadioGroup>
                                            </FormControl>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>

                                </div>
                                <div className="countryDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <p>Country</p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div className={'category'} style={{ width: '100%', paddingTop: '4px', paddingLeft: 5, paddingRight: 5 }}>
                                                <Select
                                                    className="multiple-select"
                                                    classNamePrefix="multi"
                                                    isClearable
                                                    isSearchable
                                                    value={formField.countries}
                                                    name="countries"
                                                    onChange={this.handleAll}
                                                    placeholder="Country"
                                                    options={countriesArr.map(item => ({ value: item.code, label: item.name }))} />
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>

                                {/* <div className="margin-space"></div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3 className="widget_title_small">Payment Type</h3>
                                        <ul className="tr-list">
                                            <li><a href="#">Both</a></li>
                                            <li><a href="#">Cash</a></li>
                                            <li><a href="#">Exchange</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <h3 className="widget_title_small">Experience Level</h3>
                                        <ul className="tr-list">
                                            <li><a href="">Entry Level</a></li>
                                            <li><a href="">Intermediate</a></li>
                                            <li><a href="">Expert</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="margin-space"></div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3 className="widget_title_small">Job Duration</h3>
                                        <ul className="tr-list">
                                            <li><a href="">6+ Months</a></li>
                                            <li><a href="">3 - 6 Months</a></li>
                                            <li><a href="">1 - 3 Months</a></li>
                                            <li><a href="">Below 1 Month</a></li>
                                            <li><a href="">Below 1 Week</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-6">
                                        <h3 className="widget_title_small">Hours Per Week</h3>
                                        <ul className="tr-list">
                                            <li><a href="">30 - 39</a></li>
                                            <li><a href="">20 - 29</a></li>
                                            <li><a href="">10 - 19</a></li>
                                            <li><a href="">1 - 9</a></li>
                                        </ul>
                                    </div>
                                </div> */}

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Main>);
    }
}

const searchSelector = createSelector(
    state => state.search,
    search => search
);

const categoriesSelector = createSelector(
    state => state.categories,
    categories => categories
);

const countriesSelector = createSelector(
    state => state.countries,
    countries => countries
);



const mapStateToProps = createSelector(
    categoriesSelector,
    countriesSelector,
    searchSelector,
    (categories, countries, search) => ({
        categories, countries, search
    })
);

export default connect(mapStateToProps)(JobSearch);
