import React, {Component} from 'react';
import {Main} from '../../layout';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import { uploadSelectors } from "../../../common/redux/selectors";
import { globalService as gs, itemService} from "../../../common/services";
import ServiceForm from './partials/ServiceForm';
import {NonAuthoritative} from "../Exceptions";
import { FormLoader } from '../../../common/loaders';


class ServiceUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    componentWillMount() {

        const {dispatch} = this.props;
        const id = this.props.match.params.id;
        this.setState({id: id});
        this.setState({ loading: true });
        id && itemService.service("GET", null, {item_id: id}).then(res => {
            if (gs.isOwner(res.model.user_id)) {
                let media = res.model.media;
                let skills = res.model.skills.map(item => ({value: item.id, label: item.title}));
                let category_id = {value: res.model.category.id, label: res.model.category.title};
                let subcategory_id = null;
                if (res.model.category.parent) {
                    category_id = {value: res.model.category.parent.id, label: res.model.category.parent.title};
                    subcategory_id = {value: res.model.category.id, label: res.model.category.title};
                }
                this.setState({
                    formField: {
                        category_id: category_id,
                        subcategory_id: subcategory_id,
                        title: res.model.title,
                        description: res.model.description,
                        virtual: res.model.virtual,
                        settlement: res.model.settlement,
                        budget: res.model.budget,
                        skills: skills,
                        cover_id: res.model.cover_id,
                        files: media.image && media.image.map(file => file.id)
                            .concat(media.video && media.video.map(file => file.id))
                            .concat(media.docs && media.docs.map(file => file.id)),
                    }
                });
                dispatch(uploadSelectors.respond(res.model.media));
                this.setState({ loading: false });
            } else {
                this.setState({ formField: null, loading: false });
            }

        });
    }

    render() {
        const { id, formField, loading } = this.state;
        console.log(formField);

        return (
            <Main>
                <div className="create-service bg-body">
                    <div className="container">
                        {loading ? <FormLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} width={700} /> : (formField ? <ServiceForm id={id} formField={formField} /> : <NonAuthoritative />)}
                    </div>
                </div>
            </Main>);
    }
}

const uploadSelector = createSelector(
    state => state.upload,
    upload => upload
);

const mapStateToProps = createSelector(
    uploadSelector,
    (upload) => ({
        upload
    })
);

export default connect(mapStateToProps)(ServiceUpdate);
