import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Main } from '../../layout';

  
class MainRedux2 extends Component {
  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    //if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	  const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState: editorState,
      };
    //}
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
	});
	console.log(editorState);
  };

  render() {
	const { editorState } = this.state;
	console.log(editorState);

    return (<Main>
		<div className="container py-4">
    <div className="demo-section">
        <h3>1. Controlled editor component with conversion of content from and to HTML</h3>
		eferferfrgfd
        <div className="demo-section-wrapper">
          <div className="demo-editor-wrapper">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <textarea
              disabled
              className="demo-content no-focus"
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
        </div>
      </div>

      </div>
	</Main>);
  }
}

export default MainRedux2;