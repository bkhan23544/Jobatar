import React, { Component } from 'react';
import { Main } from '../../layout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import JobForm from './partials/JobForm';
import { NonAuthoritative } from '../Exceptions';
import { globalService as gs } from "../../../common/services/global.service";
import { uploadSelectors } from '../../../common/redux/selectors';
import { itemService } from '../../../common/services';
import { FormLoader } from '../../../common/loaders';


class JobUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    componentWillMount() {

        const { dispatch } = this.props;
        const id = this.props.match.params.id;
        this.setState({ id: id, loading:true });

       id && itemService.job("GET", null, { item_id: id }).then(res => {
            if (gs.isOwner(res.model.user_id)) {
                let media = res.model.media;
                let skills = res.model.skills.map(item => ({ value: item.id, label: item.title }));
                let locations = res.model.userItemLocations.map(item => ({ value: item.country_id, label: item.name }));
                let category_id = { value: res.model.category.id, label: res.model.category.title };
                let subcategory_id = null;
                let iniDeadline = res.model.deadline ? res.model.deadline : 0;
                let deadline = { value: iniDeadline, label: iniDeadline === 0 ? `Select Month` : `Upto ${iniDeadline} month` };
                let iniIsClosed = res.model.is_closed ? res.model.is_closed : 0;
                let isClosed = { value: iniIsClosed, label: iniIsClosed === 0 ? `Open` : `Closed` };
                if (res.model.category.parent) {
                    category_id = { value: res.model.category.parent.id, label: res.model.category.parent.title };
                    subcategory_id = { value: res.model.category.id, label: res.model.category.title };
                }
                let questions = res.model.userItemQuestions
                .filter(item => ((item.question_id !== null)))
                .map(item => ({ value: item.question_id, label: item.question }));
                let customquestions = res.model.userItemQuestions
                .filter(item => (item.question_id === null))
                .map(item => item.question);
                let services = res.model.services.map(item => ({ value: item.id, label: item.title }));
                this.setState({
                    formField: {
                        category_id: category_id,
                        subcategory_id: subcategory_id,
                        locations: locations,
                        title: res.model.title,
                        description: res.model.description,
                        budget: res.model.budget,
                        deadline: deadline,
                        duration: res.model.duration,
                        is_nda: res.model.is_nda,
                        status: res.model.status,
                        visibility: res.model.visibility,
                        settlement: res.model.settlement,
                        type: res.model.type,
                        services: services,
                        is_closed: isClosed,
                        skills: skills,
                        questions: questions,
                        connections: res.model.connections,
                        customquestions: customquestions,
                        files: media.image && media.image.map(file => file.id)
                            .concat(media.video && media.video.map(file => file.id))
                            .concat(media.docs && media.docs.map(file => file.id)),
                    }
                });
                dispatch(uploadSelectors.respond(res.model.media));
                this.setState({ loading: false });
            }else{
                this.setState({ formField: null, loading: false });
            }

        });
    }

    render() {
        const { id, formField, loading } = this.state;
        return (<Main>
            <div className="create-service bg-body">
                <div className="container">
                    {loading ? <FormLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} width={700} /> : (formField ? <JobForm id={id} formField={formField} /> : <NonAuthoritative />)}
                </div>
            </div>
        </Main>);
    }
}


const skillsSelector = createSelector(
    state => state.skills,
    skills => skills
);

const categoriesSelector = createSelector(
    state => state.categories,
    categories => categories
);

const mapStateToProps = createSelector(
    categoriesSelector,
    skillsSelector,
    (categories, skills) => ({
        categories, skills
    })
);

export default connect(mapStateToProps)(JobUpdate);
