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

class JobSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                name: "",
                settlement: '',
                categories: [],
                countries: null,
                budget: 0,
                proposal_count: 0,
                sort: null,
            },
            pagesize: 20,
            page: 1,
        };
        this.initializeState = this.state;
        this.props.history.listen((location, action) => {
            const { dispatch } = this.props;
            if (location && location.search) {
                let search = new URLSearchParams(location.search);
                dispatch(searchActions.jobs("GET", {name: search.get("name")}));
            }
        });
    }

    onResetForm = (e) => {
        e.preventDefault();
        const { history } = this.props;
        this.setState(this.initializeState);
        this.listObj.value = null;
        history.push('/job-search');
        this.props.dispatch(searchActions.jobs("GET", { pagesize: 20, page: 1 }));

    };

    componentWillMount() {
        const { dispatch, categories, countries } = this.props;
        Object.getOwnPropertyNames(categories).length === 0 && dispatch(defaultActions.categories());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        if(this.props.location && this.props.location.search) {
            let search = new URLSearchParams(this.props.location.search);
            this.setState({ formField: {name: search.get("name")} });
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

    handleAll = (item, { action, name }) => {
        const formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField }, () => this.search());
    };

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
        //console.log(event);
    };

    search = () => {
        const { formField, page, pagesize } = this.state;
        const { dispatch } = this.props;
        let params = {};
        params.name = formField.name;
        params.category_id = (formField.categories && formField.categories.length > 0) ? formField.categories : null;
        params.country_code = (formField.countries && formField.countries.value) ? formField.countries.value : "";
        params.settlement = (formField.settlement && formField.settlement.value) ? formField.settlement.value : "";
        params.budget = (formField.budget && formField.budget.value) ? formField.budget.value : "";
        params.proposal_count = (formField.proposal_count && formField.proposal_count.value) ? formField.proposal_count.value : "";
        params.sort = (formField.sort && formField.sort.value) ? formField.sort.value : "";
        params.pagesize = pagesize;
        params.page = page;
        dispatch(searchActions.jobs("GET", params));
    };

    // map the groupBy field with category column
    fields = { groupBy: 'parent', text: 'name', value: 'id' };

    render() {
        const { categories, countries, search, history } = this.props;
        const { formField, pagesize } = this.state;
        let categoriesArr = categories.data ? categories.data : [];
        let countriesArr = countries.data ? countries.data : [];
        let results = search.jobs ? search.jobs : null;
        //let catlist = categoriesArr.filter(item => (item.parent_id !== null));
        let newcatlist = categoriesArr.map(item => {
            if(item.parent_id === null) {
                return {id: item.id, parent_id: item.id, parent: item.name.trim(),  name: item.name.trim()}
            } else {
                return item;
            }
        });
        let catlist = newcatlist;
        //console.log('categoriesArr', categoriesArr);
        //console.log('catlist ', catlist);


        return (<Main history={history}>
            <DocumentTitle title={'Job Search'} />
            <div className="freLncrSarch bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                <div className="any-search mb-3 mb-lg-4">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={this.handleChange} value={formField.name} name="name" placeholder="Search by Skill, Job title" />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-info" type="submit">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="filters card mb-4">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
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

                                                <div className={'category'} style={{width: '315px', paddingTop: '4px'}}>
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
                                                </div>

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

                                                <Select
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

                    <div className="row">
                        <div className="col-12 sorting mb-3 d-flex align-items-center">
                            <h6 className="col pl-0 mb-0">
                                {(results && results.pagination && results.pagination.totalCount > 0) && `${results.pagination.totalCount} Search result found.` }
                                {(results && results.length === 0) && 'No search result found.'}
                            </h6>
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
                        </div>
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
