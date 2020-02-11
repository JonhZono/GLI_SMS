import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class FileUpload extends React.Component {
  state = {
    uploadFiles: [],
    uploading: false
  };
  onDrop = files => {
    this.setState({ uploading: true });
    const formData = new FormData();
    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    };
    formData.append('file', files[0]);

    axios
      .post(`/api/user/uploadimage`, formData, config)
      .then(response => {
        this.setState(
          {
            uploading: false,
            uploadFiles: [...this.state.uploadFiles, response.data]
          },
          () => {
            this.props.imageHandler1(this.state.uploadFiles);
          }
        );
      });
  };

  onRemove = id => {
    axios
      .get(`/api/user/removeimage?public_id=${id}`)
      .then(response => {
        let images = this.state.uploadFiles.filter(item => {
          return item.public_id !== id;
        });

        this.setState(
          {
            uploadFiles: images
          },
          () => {
            this.props.imageHandler1(images);
          }
        );
      });
  };

  showUploadedImages = () =>
    this.state.uploadFiles.map(item => (
      <div
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
        className='dropzone_box'
      >
        <div
          className='wrap'
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      </div>
    ));
  render() {
    return (
      <section>
        <div className='dropzone'>
          <Dropzone onDrop={e => this.onDrop(e)} multiple={false}>
            <span>
              Please Drag & Drop File <br />
              <br />
              <i className='fas fa-cloud-upload-alt fa-6x' />
            </span>
          </Dropzone>
          {this.showUploadedImages()}
        </div>
      </section>
    );
  }
}

export default connect(null)(FileUpload);
