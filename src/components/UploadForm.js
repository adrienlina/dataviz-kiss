import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import request from 'superagent';

import environment from '../helpers/environment'

class UploadForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDropAccepted = this.onDropAccepted.bind(this);
  }

  onDropAccepted(acceptedFiles) {
    const file = acceptedFiles[0];

    request.post(`${environment.backend}/upload`)
    .attach('file', file)
    .then(() => {
      this.props.onUpload(file);
    });
  }

  render() {
    const mimeTypes = 'text/comma-separated-values,text/csv,application/csv,application/excel,application/vnd.ms-excel,application/vnd.msexcel,text/anytext'
    return (
      <Dropzone accept={mimeTypes} onDropAccepted={this.onDropAccepted}>
        Upload your CSV
      </Dropzone>
    )
  }
}

UploadForm.propTypes = {
  onUpload: PropTypes.func,
};

export default UploadForm;
