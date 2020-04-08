import React, { Component, Fragment } from 'react';
import { FormControl, Select, MenuItem, Button, Input, Badge } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { history } from '../../../helpers/history';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'jobs',
            value: '',
            submitted: false,
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

        this.props.history && this.props.history.listen((location, action) => {
            const { history } = this.props;
            if (location && location.search) {
                if (history !== undefined) {
                    this.checkUrl(history && history.location);
                }
            }
        });

    }

    handleChange(event) {
        let formField = this.state;
        formField[event.target.name] = event.target.value;
        this.setState(formField);
    }

    componentWillReceiveProps(nextProp) {
        let search = new URLSearchParams(nextProp.search);
        const { history } = this.props;
        if (history !== undefined) {
            this.checkUrl(history && history.location);
        }
    }

    componentWillMount() {
        const { history } = this.props;
        if (history !== undefined) {
            this.checkUrl(history && history.location);
        }
    }

    checkUrl(location) {
        const search = new URLSearchParams(location.search);
        switch (location.pathname) {
            case '/service-search':
                this.setState({ value: ((search.get("title") !== null) ? search.get("title") : ''), category: 'services' });
                break;
            case '/freelancer-search':
                this.setState({ value: ((search.get("name") !== null) ? search.get("name") : ''), category: 'freelancers' });
                break;
            case '/cofounders-search':
                this.setState({ value: ((search.get("name") !== null) ? search.get("name") : ''), category: 'co-founder' });
                break;
            case '/job-search':
                this.setState({ value: ((search.get("name") !== null) ? search.get("name") : ''), category: 'jobs' });
                break;
            default:
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { value, category } = this.state;
        if (category && category.length < 0) {
            alert('Please select dropdown option')
        }
        if ((value && value.length < 0) || (value && value === null)) {
            alert('Please select less than 1 word')
        }
        switch (category) {
            case 'services':
                history.push('/service-search?title=' + value);
                break;
            case 'freelancers':
                history.push('/freelancer-search?name=' + value);
                break;
            case 'jobs':
                history.push('/job-search?name=' + value);
                break;
            case 'co-founder':
                history.push('/cofounders-search?name=' + value);
                break;
            default:
        }
        //alert(this.state.category.length + '===' + this.state.value);
    }

    clear=(ev)=>{
        if(ev.target.className === "MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary"){
            this.setState({
                value: '',
            })
        }
    }

    render() {
        const { category, value } = this.state;
        //console.log('Seact js', this.props);
        return (
            <Fragment>
                    <form className="form-inline order-1 ml-lg-5" onSubmit={this.handleSubmit.bind(this)}>
                {/* <Badge onClick={(ev)=>this.clear(ev)} style={{cursor: "pointer"}} color="secondary" badgeContent={"x"}> */}
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FormControl variant="outlined">
                                        <Select
                                            value={category ? category : ''}
                                            onChange={this.handleChange}
                                            input={<Input
                                                name="category"
                                                id="outlined-age-simple" />}
                                            className="header-search"
                                        >
                                            {/*<MenuItem value="Select">Select</MenuItem>*/}
                                            <MenuItem value="jobs">Jobs</MenuItem>
                                            <MenuItem value="services">Services</MenuItem>
                                            <MenuItem value="freelancers">Freelancers</MenuItem>
                                            <MenuItem value="co-founder">Co-founders</MenuItem>
                                        </Select>
                                    </FormControl>
                                </span>
                            </div>
                            <input className="form-control" type="text" name="value" value={value ? value : ''} onChange={this.handleChange} />
                            <div className="input-group-append button">
                                <Button type="submit"> <SearchIcon /></Button>
                            </div>
                        </div>
                {/* </Badge> */}
                    </form>
            </Fragment>
        );
    }
}

export default Search;