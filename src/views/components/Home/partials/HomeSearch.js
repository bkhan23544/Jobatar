import React, { Component } from 'react';


class HomeSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                value: ""
            },
            show: false
        };

    }

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleSubmit = (e) => {
        e.preventDefault();
       /* const validation = this.validator().validate(this.state.formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            // handle actual form submission here
            const { dispatch } = this.props;

        }*/
    };

    render() {
        return (
            <form name="homesearch" onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control border-right-0" placeholder="I’m looking for" onChange={this.handleChange} />
                    <div className="input-group-append">
                        <span className="input-group-text pr-0">In: </span>
                    </div>
                    <select className="custom-select form-control mb-0 pl-2" value={this.state.value} onChange={this.handleChange}>
                        <option>Search</option>
                        <option value="software_engineer">Software Engineer</option>
                        <option value="technical_writer">Technical Writer</option>
                        <option value="ui_designer">UI Designer</option>
                        <option value="ux_designer">UX Designer</option>
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-info px-3" type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
        );
    }
}

export default HomeSearch;