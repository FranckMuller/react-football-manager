import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import Button from '../../button';
import ModalWindow from '../../modal-window';
import ReactCrop from 'react-image-crop';

class FirstStep extends Component {

  state = {
    disableBtn: true,
    isShow: true,
    errorInput: false,
    errorDropzone: false,
    crop: {
      unit: "px",
      width: 30,
      aspect: 1 / 1
    }
  };

  componentWillUpdate({ clubName, clubLogo }) {
    // validation
    if (clubName !== this.props.clubName || clubLogo !== this.props.clubLogo) {
      if (!clubName.match("^[a-zA-Z]+$") && clubName.length > 0) {
        this.setState({
          errorInput: true,
          disableBtn: true
        });
        return;
      } else {
        if (clubLogo !== null && clubName.length > 0) {
          this.setState({
            errorInput: false,
            disableBtn: false
          });
          return;
        }
        this.setState({
          errorInput: false,
          disableBtn: true
        });
        return;
      };
    };
  };

  onCropImage = (crop) => {
    this.setState({
      crop: crop
    });
  };

  onImageLoaded = (image) => {
    console.log(image);
  };

  onCropCompleted = (crop, percentCrop) => {
    console.log(crop, percentCrop)
  }

  render() {
    const { errorInput, disableBtn } = this.state;
    const { clubLogo, onChangeInput, onToggleStep, classes, onDropImage, errorDropzone } = this.props;

    let groupNameClasses = 'form-group d-flex flex-column';
    let groupPhotoClasses = 'form-group d-flex flex-column'
    let errorInputNotice = null
    let viewCropImage = null;
    let errorDropImageNotice = null;

    if (errorInput) {
      errorInputNotice = <div className="error-notice"><span>Only latin characters</span></div>;
      groupNameClasses += ' error';
    };

    if (errorDropzone) {
      errorDropImageNotice = <div className="error-notice"><span>file size should not exceed 2mb</span></div>;
      groupPhotoClasses += ' error';
    };

    return (
      <div className={classes}>
        <div className={groupNameClasses}>
          {errorInputNotice}
          <span className="title-form-group">Club name</span>
          <input
            type="text"
            placeholder="Enter your club name"
            onChange={(e) => onChangeInput(e, 'club-name')} />
        </div>
        <div className={groupPhotoClasses}>
          {errorDropImageNotice}
          <div className="title-form-group">Club logo</div>
          <ReactDropzone
            onDrop={onDropImage}
            maxSize={100000000}
            accept='image/jpeg, image/png'>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={"placeholder" + (clubLogo !== null ? ' hidden' : '')}>Select or drag club logo</div>
                {clubLogo !== null ? <img src={clubLogo} /> : null}
              </div>
            )}
          </ReactDropzone>
        </div>
        <Button
          disable={false}
          classes="btn d-flex align-items-center"
          btnLabel="Next" btnAction={onToggleStep} />

        {this.props.children}
      </div>
    );
  };
};

export default FirstStep;
