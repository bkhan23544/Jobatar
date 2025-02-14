import React, { PureComponent } from 'react';
import { Main } from '../../layout';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Select from "react-select";
import Pagination from '../../../helpers/Pagination';
import { searchActions, defaultActions } from '../../../common/redux/actions';
import { ServiceListing } from './partials';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class ServiceSearch extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                name: "",
                title: "",
                settlement: '',
                categories: [],
                countries: [],
                budget: 0,
                proposal_count: 0,
                sort: null,
            },
            page: 1,
            pagesize: 20,
            favorite: {},

        };
        this.initializeState = this.state;
        this.props.history.listen((location, action) => {
            const { dispatch } = this.props;
            if (location && location.search) {
                let search = new URLSearchParams(location.search);
                dispatch(searchActions.services("GET", {title: search.get("title")}));
                //dispatch(searchActions.services("GET", {title: title}))
            }
        });
    }

    componentWillMount() {
        const { dispatch, categories, countries } = this.props;
        Object.getOwnPropertyNames(categories).length === 0 && dispatch(defaultActions.categories());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        /*if(this.props.location && this.props.location.search) {
            let search = new URLSearchParams(this.props.location.search);
            let name = search.get("name");
            let title = search.get("title");
            this.setState({ formField: {
                name, title
            }});
            console.log('componentWillMount');
        }*/

    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        this.setState(this.initializeState);
        dispatch(searchActions.clear());
    }

    componentWillReceiveProps(nextProps) {
        //const { title } = this.props;
        if (nextProps.location && nextProps.location.search) {
            let search = new URLSearchParams(this.props.location.search);
            let formField = { ...this.state.formField };
            formField['name'] = search.get("name");
            formField['title'] = search.get("title");
            this.setState({ formField });
        }
    }


    onResetForm = (e) => {
        e.preventDefault();
        const { history } = this.props;
        this.setState(this.initializeState);
        this.listObj.value = null;
        history.push('/service-search');
        this.props.dispatch(searchActions.services("GET", { pagesize: 20, page: 1 }));
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleAll = (item, { action, name }) => {
        const formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField }, () => this.search());
    };

    onChangePage = (page) => {
        this.setState({ page }, () => this.search());
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;
        history.push('/service-search?title=' + this.state.formField.title);
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
        const { formField, pagesize, page } = this.state;
        const { dispatch, sort } = this.props;
        let params = {};
        params.name = formField.name;
        params.title = formField.title;
        params.category_id = (formField.categories && formField.categories.length > 0) ? formField.categories : null;
        params.country_code = (formField.countries && formField.countries.value) ? formField.countries.value : "";
        params.settlement = (formField.settlement && formField.settlement.value) ? formField.settlement.value : "";
        params.budget = (formField.budget && formField.budget.value) ? formField.budget.value : "";
        params.proposal_count = (formField.proposal_count && formField.proposal_count.value) ? formField.proposal_count.value : "";
        params.sort = (sort) ? sort : ((formField.sort && formField.sort.value) ? formField.sort.value : "");
        params.pagesize = pagesize;
        params.page = page;
        dispatch(searchActions.services("GET", params));
    };

    // map the groupBy field with category column
    fields = { groupBy: 'parent', text: 'name', value: 'id' };

    render() {

        const { categories, countries, search, history } = this.props;
        const { formField, pagesize } = this.state;
        let categoriesArr = categories && categories.data ? categories.data : [];
        let countriesArr = countries && countries.data ? countries.data : [];
        let results = search.services ? search.services.items : null;
        //let catlist = categoriesArr.filter(item => (item.parent_id !== null));
        let newcatlist = categoriesArr.map(item => {
            if(item.parent_id === null) {
                return {id: item.id, parent_id: item.id, parent: item.name.trim(),  name: item.name.trim()}
            } else {
                return item;
            }
        });
        let catlist = newcatlist;

        return (<Main history={history}>
            <DocumentTitle title={`Services Search`}/>
            <div className="freLncrSarch bg-body">
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                <div className="any-search mb-2 mb-lg-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" onChange={this.handleChange} value={formField.title} name="title"
                                            placeholder="Search by Skill, Service" />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-info" type="submit">Search</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="filters card mb-0">
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
                                                            { value: "0", label: "Any budget amount" },
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
                                                        placeholder="Number of Offers"
                                                        onChange={this.handleAll}
                                                        options={[
                                                            { value: "0", label: "Any number of offers" },
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
                    <div className="row">
                        <div className="col-12 sorting my-2 d-flex align-items-center">
                            <h6 className="mt-3 mt-lg-4 pb-3 col pl-0">
                                {(search && search.services && search.services.pagination && search.services.pagination.totalCount > 0) && `${search.services.pagination.totalCount} Search result found.` }
                                {(results && results.length === 0) && 'No search result found.'}
                            </h6>
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
                        </div>
                    </div>
                    <ServiceListing results={results} />
                    <div className="col-12">
                        <Pagination className="justify-content-end"
                            pageSize={pagesize}
                            totalCount={(search && search.services && search.services.pagination && search.services.pagination.totalCount) ? search.services.pagination.totalCount : 3}
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

export default connect(mapStateToProps)(ServiceSearch);
