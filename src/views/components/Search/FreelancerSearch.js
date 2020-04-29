import React, { PureComponent } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";
import { createSelector } from "reselect";
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { defaultActions, searchActions } from "../../../common/redux/actions";
import { DocumentTitle } from "../../../helpers/DocumentTitle";
import Pagination from "../../../helpers/Pagination";
import { Main } from "../../layout";
import { FreelancerListing } from './partials';
import CancelIcon from '@material-ui/icons/Cancel';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControl, RadioGroup, FormLabel, Radio, FormControlLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const ratingList = [
    { id: -1, value: 'Any' },
    { id: 5, value: '5 Stars' },
    { id: 4, value: '4+ Stars' },
    { id: 3, value: '3+ Stars' }
];

class FreelancerSearch extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                name: "",
                categories: [],
                ratings: '',
                countries: '',
                is_co_founder: false,
                is_verified: false,
                sort: null,
            },
            page: 1,
            pagesize: 12,
        };
        this.initializeState = this.state;
        this.props.history.listen((location, action) => {
            const { dispatch, name } = this.props;
            if (location && location.search) {
                let search = new URLSearchParams(location.search);
                let name = (search.get("name") !== null) ? search.get("name") : '';
                let is_co_founder = this.props.is_co_founder;
                let formField = { ...this.state.formField };
                formField['name'] = name;
                formField['is_co_founder'] = is_co_founder;
                this.setState({ formField }, () => this.search());
                //dispatch(searchActions.freelancers("GET", {name: name}));
            }
        });
    }




    componentWillMount() {
        const { dispatch, categories, countries, name, is_co_founder } = this.props;
        Object.getOwnPropertyNames(categories).length === 0 && dispatch(defaultActions.categories());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        this.setState({ formField: { name, is_co_founder } });
        if (this.props.location && this.props.location.search) {
            let search = new URLSearchParams(this.props.location.search);
            this.setState({ formField: { name: (search.get("name") !== null) ? search.get("name") : '' } });
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.path !== this.props.path) {
            let search = new URLSearchParams(nextProps.location.search);
            let name = (search.get("name") !== null) ? search.get("name") : '';
            let is_co_founder = nextProps.is_co_founder;
            let formField = { ...this.state.formField };
            formField['name'] = name;
            formField['is_co_founder'] = is_co_founder;
            this.setState({ formField }, () => this.search());
            //this.setState({ formField: {name, is_co_founder} }, () => this.search());
        }
    }

    onResetForm = (e) => {
        e.preventDefault();
        const { location, history } = this.props;
        this.setState(this.initializeState);
        this.setState({ formField: { is_co_founder: (location.pathname === '/cofounders-search') ? true : false, is_verified: null, ratings: null, countries: null, sort: null, name: '' } });
        this.listObj.value = null;
        if (location.pathname === '/freelancer-search') {
            history.push('/freelancer-search');
            this.props.dispatch(searchActions.freelancers("GET", { pagesize: 12, page: 1, is_co_founder: 0 }));
        } else {
            history.push('/cofounders-search');
            this.props.dispatch(searchActions.freelancers("GET", { pagesize: 12, page: 1, is_co_founder: 1 }));
        }
        //this.props.dispatch(searchActions.freelancers("GET", { pagesize: 20, page: 1, is_co_founder: null }));
    };

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(searchActions.clear());
    }

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleCheckboxChange = (e) => {
        const formField = { ...this.state.formField };
        formField[e.target.name] = e.target.checked;
        this.setState({ formField }, () => this.search());
    };

    handleAll = (item, { action, name }) => {
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
        this.setState({ page }, () => this.search());
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { history, is_co_founder } = this.props;
        if (is_co_founder) {
            history.push('/cofounders-search?name=' + this.state.formField.name);
        } else {
            history.push('/freelancer-search?name=' + this.state.formField.name);
        }
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

    };

    onCloseCategory = (event) => {

    };


    search = () => {
        const { formField, pagesize, page } = this.state;
        const { dispatch } = this.props;
        let params = {};
        params.category_id = (formField.categories && formField.categories.length > 0) ? formField.categories : null;
        params.rating_id = formField.ratings;
        params.country_code = formField.countries;
        params.sort = (formField.sort && formField.sort.value) ? formField.sort.value : "";
        params.name = formField.name;
        params.is_co_founder = (formField.is_co_founder === true) ? 1 : 0;
        params.is_verified = formField.is_verified;
        params.pagesize = pagesize;
        params.page = page;
        dispatch(searchActions.freelancers("GET", params));
    };

    filterToggle = (id) => {
        document.getElementById(id).classList.toggle("section1MobOpen")
    }

    // map the groupBy field with category column
    fields = { groupBy: 'parent', text: 'name', value: 'id' };

    render() {
        const { categories, countries, search, title, history, location, is_co_founder } = this.props;
        const { formField } = this.state;
        let categoriesArr = categories.data ? categories.data : [];
        let countriesArr = countries.data ? countries.data : [];
        let results = search.freelancers ? search.freelancers : null;
        // console.log(search,results)
        let catlist = categoriesArr.filter(item => (item.parent_id !== null));

        return (<Main history={history}>
            <DocumentTitle title={title} />
            {/* <div className="freLncrSarch bg-body">
                <div className="container">
                    <div id="section1" className="section1 section1MobClose">
                        <div className="row">
                            <div className="col-12">
                                <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate> */}
            {/* <div className="any-search mb-3 mb-lg-4">
                                        <div className="input-group">
                                            <input type="text" className="form-control" onChange={event => this.handleChange(event)} value={formField.name} name="name" placeholder={(location.pathname === '/cofounders-search') ? 'Search by Cofounder' : 'Search by Freelancer'} />
                                            <div className="input-group-prepend">
                                                <button className="btn btn-info" type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div> */}

            {/* <div className="filters card mb-4">
                                        <div className="card-body">
                                            <div className="clearIcon" style={{width: "100%", height: "30px"}}>
                                                <CancelIcon onClick={()=>this.filterToggle("section1")} 
                                                style={{float: "right", color: "red"}} />
                                            </div>
                                            <div className="align-items-center">
                                                <div className="w-100">
                                                    <div className="d-flex align-items-center flex-wrap custom-row">
                                                        <div className={'category'} style={{ width: '100%', paddingLeft: 5, paddingRight: 5, paddingTop: '4px' }}>
                                                            <MultiSelectComponent
                                                                id="mtselement"
                                                                cssClass={'multi-droupdown'}
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
            {/*value={formField.categories}*/}
            {/*name="categories"*/}
            {/*placeholder="Category"*/}
            {/*onChange={this.handleAll}*/}
            {/*options={categoriesArr.map(item => ({ value: item.id, label: item.name }))} />*/}

            {/* <Select
                                                            className="multiple-select ratings"
                                                            classNamePrefix="multi"
                                                            isSearchable
                                                            isMulti
                                                            name="ratings"
                                                            value={formField.ratings}
                                                            placeholder="Rating"
                                                            onChange={this.handleAll}
                                                            options={ratingList.map(item => ({ value: item.id, label: item.value }))} />

                                                        <Select
                                                            className="multiple-select countries"
                                                            classNamePrefix="multi"
                                                            isSearchable
                                                            isClearable
                                                            name="countries"
                                                            value={formField.countries}
                                                            placeholder="Country"
                                                            onChange={this.handleAll}
                                                            options={countriesArr.map(item => ({ value: item.code, label: item.name }))} />

                                                        <div className="co-founder">
                                                            {!is_co_founder &&
                                                                <Form.Check
                                                                    custom
                                                                    inline
                                                                    name="is_co_founder"
                                                                    label="Co-founder"
                                                                    checked={formField.is_co_founder}
                                                                    type={"checkbox"}
                                                                    id={`custom-inline-1`}
                                                                    onChange={this.handleCheckboxChange}
                                                                />} */}
            {/*<Form.Check*/}
            {/*custom*/}
            {/*inline*/}
            {/*name="is_verified"*/}
            {/*label="Verified"*/}
            {/*checked={formField.is_verified}*/}
            {/*type={"checkbox"}*/}
            {/*id={`custom-inline-2`}*/}
            {/*onChange={this.handleCheckboxChange}*/}
            {/*/>*/}
            {/* </div>

                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <button className="font-weight-bold btn btn-link text-info text-nowrap" type="button"
                                                        onClick={this.onResetForm}>Reset Filters
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="section2">
                        <div className="row"> */}
            {/* <form style={{ width: "100%" }} name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                <div style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }} className="any-search mb-3 mb-lg-4">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={event => this.handleChange(event)} value={formField.name} name="name" placeholder={(location.pathname === '/cofounders-search') ? 'Search by Cofounder' : 'Search by Freelancer'} />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-info" type="submit">Search</button>
                                        </div>
                                    </div>
                                    <p onClick={() => this.filterToggle("section1")}>Advance Filter</p>
                                </div>
                            </form> */}
            {/* <div className="col-12 sorting mb-3 d-flex align-items-center">
                                <h6 className="col pl-0 mb-0">
                                    {(results && results.pagination && results.pagination.totalCount > 0) && `${results.pagination.totalCount} Search result found.`}
                                    {(results && results.length === 0) && 'No search result found.'}
                                </h6> */}
            {/*
                                <div className="sort">
                                    <Select
                                        className="multiple-select"
                                        classNamePrefix="multi"
                                        placeholder="Sort By"
                                        name="sort"
                                        value={formField.sort}
                                        onChange={this.handleAll}
                                        options={[{ value: "id", label: "Most Recent" }]} />
                                </div>
                            */}
            {/* </div>
                        </div>
                        <FreelancerListing results={results} is_co_founder={formField.is_co_founder} />
                        <div className="col-12">
                            <Pagination className="justify-content-end"
                                pageSize={formField.pagesize}
                                totalPages={3}
                                totalCount={(results && results.pagination && results.pagination.totalCount) ? results.pagination.totalCount : 10}
                                onChangePage={this.onChangePage} />
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="featured-users">
                <div className="container">
                    <div className="section-title">
                        <h1>{formField.is_co_founder ? "Co-founder" : "Freelancers"}</h1>
                    </div>
                    <div className="row reverseDirection">

                        <div className="col-lg-9 MarginTop">
                            <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                <div style={{ width: "100%", marginBottom: "20px" }} className="input-group headerInput2">
                                    <input type="text" className="form-control" onChange={event => this.handleChange(event)} value={formField.name} name="name" placeholder={(location.pathname === '/cofounders-search') ? 'Search by Cofounder' : 'Search by Freelancer'} />
                                    <div className="input-group-prepend">
                                        <button className="btn btn-info" type="submit">Search</button>
                                    </div>
                                </div>
                            </form>
                            {/* <form style={{ width: "100%" }} name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                <div style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }} className="any-search mb-3 mb-lg-4">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={event => this.handleChange(event)} value={formField.name} name="name" placeholder={(location.pathname === '/cofounders-search') ? 'Search by Cofounder' : 'Search by Freelancer'} />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-info" type="submit">Search</button>
                                        </div>
                                    </div>
                                    <p onClick={() => this.filterToggle("section1")}>Advance Filter</p>
                                </div>
                            </form> */}
                            <FreelancerListing results={results} is_co_founder={formField.is_co_founder} />
                            <div className="paginationCommon blogPagination text-center">
                                <Pagination className=""
                                    pageSize={12}
                                    totalPages={3}
                                    totalCount={(results && results.pagination && results.pagination.totalCount) ? results.pagination.totalCount : 10}
                                    onChangePage={this.onChangePage} />
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12">
                            <div className="widget">
                                {/* <div className="text-right">
                                    <button style={{ color: "red !important" }} className="font-weight-bold btn btn-link text-info text-nowrap" type="button" onClick={this.onResetForm}>Reset Filters</button>
                                </div> */}

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

                                <div className="budgetDiv">
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className="top"
                                        >
                                            <p>Rating </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="proposal_count" value={formField.ratings}
                                                    name="ratings"
                                                    onChange={(ev) => this.RadioButtonChanger(ev)}
                                                >
                                                    {ratingList.map((a) => {
                                                        return (
                                                            <FormControlLabel value={a.id} control={<Radio size="small" />} label={a.value} />
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
                                            <p>Hourly Rates </p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="budget" value={formField.budget}
                                                    name="budget"
                                                // onChange={(ev) => this.RadioButtonChanger(ev)} 
                                                >
                                                    {[
                                                        { value: "0", label: "Any hourly rate" },
                                                        { value: "1", label: "$10 and below" },
                                                        { value: "2", label: "$10-$30" },
                                                        { value: "3", label: "$30-$60" },
                                                        { value: "4", label: "$60 & above" }
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
                                            <p>Hours Billed</p>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <FormControl component="fieldset">
                                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                <RadioGroup aria-label="budget" value={formField.budget}
                                                    name="budget"
                                                // onChange={(ev) => this.RadioButtonChanger(ev)} 
                                                >
                                                    {[
                                                        { value: "0", label: "Any hours" },
                                                        { value: "1", label: "1+ hours billed" },
                                                        { value: "2", label: "100+ hours billed" },
                                                        { value: "3", label: "1,000+ hours billed" }
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

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    categoriesSelector,
    countriesSelector,
    processSelector,
    searchSelector,
    (categories, countries, process, search) => ({
        categories, countries, process, search
    })
);

export default connect(mapStateToProps)(FreelancerSearch);



