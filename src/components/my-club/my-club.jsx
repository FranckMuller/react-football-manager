import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import { Route } from 'react-router-dom';

import './my-club.scss';

class MyClub extends Component {

  state = {
    ownerPhoto: null
  }

  onDrop = (acceptedFiles) => {
    this.getBase64(acceptedFiles[0]);
  }

  getBase64(file) {
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        ownerPhoto: reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="my-club container-fluid">
        <h3 className="title-page text-center">
          Club configuration
        </h3>
        <div className="my-club-form">
          <form action="" className="d-flex flex-wrap">
            <div className="form-group d-flex flex-column">
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Onwer name</div>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Onwer photo</div>
                <ReactDropzone
                  onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="placeholder">
                        Select or drag your photo
                      </div>
                    </div>
                  )}
                </ReactDropzone>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Club name</div>
                <input type="text" placeholder="Enter club name" />
              </div>
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Club logo</div>
                <ReactDropzone
                  onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="placeholder">
                        Select or drag club logo
                      </div>
                    </div>
                  )}
                </ReactDropzone>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Stadium name</div>
                <input type="text" placeholder="Enter stadium name" />
              </div>
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Stadium photo</div>
                <ReactDropzone
                  onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="placeholder">
                        Select or drag stadium photo
                      </div>
                    </div>
                  )}
                </ReactDropzone>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Trainer name</div>
                <input type="text" placeholder="Enter stadium name" />
              </div>
              <div className="input-group d-flex flex-column">
                <div className="title-form-group flex-grow-1 flex-shrink-1">Trainer photo</div>
                <ReactDropzone
                  onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="placeholder">
                        Select or drag trainer photo
                      </div>
                    </div>
                  )}
                </ReactDropzone>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

};

export default MyClub;
