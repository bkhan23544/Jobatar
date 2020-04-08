import React, { Component } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import "./Compose.css";
import FormValidator from "../../../../helpers/FormValidator";
import { messageActions } from "../../../../common/redux/actions";
import { globalService as gs } from "../../../../common/services";
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

class Compose extends Component {

	constructor(props) {
		super(props);
		const { current } = props;
		const authentication = gs.parseItem('authentication');
		this.state = {
			activeKey:  current.key,
			current: current,
			user_id: authentication.user.id,
			createdAt: null,
			formField: {
				text: '',
			},
			submitted: false,
			is_attachment: false,
			attachment: false,
			docs: [],
			images: [],
			is_uploaded: true,
			validation: this.validator().valid(),
		};
		//this.attachments = [];
		this.group = current.group;
		this.item = current.item;
		this.initializeState = this.state;
	}

	componentDidMount = async () => {
		await this.findUnRead();
	};

	componentWillReceiveProps = async () => {
		await this.findUnRead();
	};

	findUnRead = async () => {
		const { profile, activeKey, current } = this.props;
		const currentRecipients = gs.ObjectToArray(current.message.recipients);
		const rootRef = await gs.db.ref(`UserMessage/${activeKey}`);
		const user_id = parseInt(this.state.user_id);
		currentRecipients.map((recipient) => {
			const userId = recipient.id;
			rootRef.orderByChild(`recipients/${userId}/status`)
				.equalTo('unread')
				.once("value").then(async (snap) => {
					const items = gs.ObjectToArray(snap.val());
					let count = parseInt(items.length);
					recipient.unread = (userId === user_id) ? count : (count + 1);
					current.message.recipients[userId] = recipient;
					this.setState({ profile, activeKey, current });
				});
		});
	};


	handleChange = (e) => {
		let formField = { ...this.state.formField };
		formField[e.target.name] = e.target.value;
		this.setState({ formField });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { formField, user_id, activeKey, current } = this.state;
		const { dispatch, } = this.props;
		const validation = this.validator().validate(formField);
		this.setState({ validation, submitted: true });
		const params = {};
		params.text = formField.text;
		params.recipients = gs.ObjectToArray(current.message.recipients);
		params.group = current.group;
		params.item = current.item;
		params.user_id = user_id;
		params.attachment = null;
		if (validation.isValid) {
			dispatch(messageActions.sendMessageToFirebase(params, activeKey));
			this.setState(this.initializeState);
		}
	};

	validator() {
		return new FormValidator([
			{ field: 'text', method: 'isEmpty', validWhen: false, message: 'Text is required.' },
		]);
	};

	addAttachment = (attachment, createdAt) => {
		const { user_id, activeKey, current } = this.state;
		const { dispatch, } = this.props;
		const params = {};
		params.text = attachment;
		params.recipients = gs.ObjectToArray(current.message.recipients);
		params.group = this.group;
		params.item = this.item;
		params.user_id = user_id;
		if (createdAt !== null) {
			params.created_at = createdAt;
		}
		params.attachment = attachment;
		dispatch(messageActions.sendMessageToFirebase(params, activeKey));
		this.setState(this.initializeState);
	};

	handleUpload = (e) => {
		// Create file metadata including the content type
		const files = e.target.files;
		const storage = gs.storage;
		const { activeKey } = this.state;
		const self = this;
		if (files !== null) {
			this.setState({ attachment: files, });
			let i = 0;
			for (let file of files) {
				i = i + 1;
				const mime = (file.type === null) ? 'application/octet-stream' : file.type;
				var metadata = { contentType: mime, };
				const createdAt = parseInt(Date.now()) + parseInt(i);
				const upload = storage.ref(`${activeKey}/${createdAt}/${file.name}`).put(file, metadata);
				upload.on('state_changed', this.progress, this.error, this.success);
				upload.then(function (snapshot) {
					let attachment = snapshot.ref.getDownloadURL();
					attachment.then(function (downloadURL) {
						self.addAttachment(downloadURL, createdAt);
					});
				});
			}
		}
	};

	progress = (snapshot) => {
		// Observe state change events such as progress, pause, and resume
		let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
		switch (snapshot.state) {
			case 'paused': // or 'paused'
				console.log('Upload is paused');
				break;
			case 'running': // or 'running'
				console.log('Upload is running');
				break;
		}
	}

	error = (error) => {
		console.error(error);
	}

	success = () => {
		//this.setState({ is_uploaded: true });
	}

	render() {
		const { formField, submitted, validation } = this.state;
		let isValid = submitted ? this.validator().validate(formField) : validation;

		return (
			<div className="w-100">
				<form className="compose border-top" name="service" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
					<textarea
						className={'compose-input ' + (submitted && isValid.text.isInvalid ? 'is-invalid' : '')}
						placeholder="Write a reply..."
						name="text"
						onChange={this.handleChange}
						value={formField.text}
						rows={3}
					/>
					<input
						accept="*"
						id="icon-button-file"
						type="file"
						className="d-none"
						onChange={this.handleUpload}
					/>
					<label htmlFor="icon-button-file" className="mt-2 mr-1">
						<IconButton variant="contained" color="primary" aria-label="upload picture" component="span">
							<Icon className="fas fa-paperclip text-info"></Icon>
						</IconButton>
					</label>

					<div className="fab-loading">
                        <Fab color="primary" type="submit" size="small" disabled={false} aria-label="add">
                            <Icon size="22">send</Icon>
                        </Fab>
                        {/*<CircularProgress size={68} className="circular" />*/}
					</div>
				</form>
			</div>
		);
	}
}

const processSelector = createSelector(
	state => state.process,
	process => process
);

const authenticationSelector = createSelector(
	state => state.authentication,
	authentication => authentication
);

const mapStateToProps = createSelector(
	processSelector,
	authenticationSelector,
	(process, authentication) => ({
		process,
		authentication
	})
);

export default connect(mapStateToProps)(Compose);
