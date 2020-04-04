import React, { Component } from 'react';
import { globalService as gs } from '../../../../common/services';


class Attachment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activeKey: props.activeKey,
            createdAt: props.createdAt,
            text: props.text,
            attachment: props.attachment,
        };

    }

    componentDidMount = () => {
        const { attachment } = this.state;
        let extension = gs.fileExtension(attachment);
        if(gs.checkImage(extension) === true){
            this.getImagesHttpUrl();
        }
        // this.getAttachmentHttpUrl();
        // this.getLargeImagesHttpUrl();
    };

    /*getAttachmentHttpUrl = () => {
        const { activeKey, createdAt } = this.state;
        const self = this;
        const storageRef = gs.storage.ref(`${activeKey}/${createdAt}`);
        storageRef && storageRef.listAll().then((result) => {
            if (result.items.length > 0) {
                result.items.forEach(async (imageRef) => {
                    await imageRef.getDownloadURL().then(async (url) => {
                        let extension = gs.fileExtension(url);
                        if (gs.checkImage(extension) === false) {
                            this.attachments.push(url);
                        }
                    });
                    self.setState({ loading: false, attachments: this.attachments });
                });
            }
        });
    };
    getLargeImagesHttpUrl = () => {
        const { activeKey, createdAt } = this.state;
        const self = this;
        const storageRef = gs.storage.ref(`${activeKey}/${createdAt}`);
        storageRef && storageRef.listAll().then((result) => {
            if (result.items.length > 0) {
                result.items.forEach(async (imageRef) => {
                    await imageRef.getDownloadURL().then(async (url) => {
                        let extension = gs.fileExtension(url);
                        if (gs.checkImage(extension) === true) {
                            await this.largeAttachments.push(url);
                        }
                    });
                    self.setState({ largeAttachments: this.largeAttachments });
                });
            }
        });
    };
    */

    getImagesHttpUrl = () => {
        const { activeKey, createdAt } = this.state;
        const self = this;
        const storageRef = gs.storage.ref(`${activeKey}/${createdAt}/thumbs`);
        storageRef && storageRef.listAll().then((result) => {
            if (result.items.length > 0) {
                result.items.forEach(async (imageRef) => {
                    await imageRef.getDownloadURL().then(async (url) => {
                        let extension = gs.fileExtension(url);
                        if (gs.checkImage(extension) === true && url.indexOf('200x200') !== -1) {
                            self.setState({ attachment: url });
                        }
                    });
                });
            }
        });
    };

    renderItem = (uri) => {
        const { attachment } = this.state;
        let extension = gs.fileExtension(uri);
        let icons = gs.classIcon(extension);
        return (uri !== undefined || uri !== '' || uri !== null) ? ((gs.checkImage(extension) === true) ?
            (<a href={`${uri}`} target="_blank" rel="noopener noreferrer"><img src={attachment} width="200" /></a>) : (<a href={`${uri}`} target="_blank" rel="noopener noreferrer"><i className={`fa-6x far fa-file-${icons}`}></i></a>)) : (<span></span>);
    };

    render() {
        const { attachment } = this.state;
        let extension = gs.fileExtension(attachment);
        if (gs.checkImage(extension) === true) {
            return ( attachment === null ) ? (<div className="attachments">Loading....</div>) : (<div className="attachments">{this.renderItem(this.props.attachment)}</div>)
        } else {
            return (<div className="attachments">{this.renderItem(this.props.attachment)}</div>)
        }
    }
}

export default Attachment;
