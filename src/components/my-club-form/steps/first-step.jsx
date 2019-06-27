import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import Button from '../../button';
import ModalWindow from '../../modal-window';
import ReactCrop from 'react-image-crop';

const imageMaxSize = 2000000;

class FirstStep extends Component {

  state = {
    isAnimate: true,
    disableBtn: true,
    isShow: true,
    errorInput: false,
    errorDropzone: false,
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

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        isAnimate: false
      });
    }, 1000)
  };

  toggleAnimateClass() {
    this.setState({
      isShow: false
    });
  };

  onChangeStep = (e) => {
    e.preventDefault();
    const { onToggleStep } = this.props;

    this.toggleAnimateClass();

    setTimeout(() => {
      onToggleStep(2)
    }, 500);
  }

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileSize = currentFile.size
      if (currentFileSize > imageMaxSize) {
        this.setState({
          errorDropzone: true
        });
        return false
      }
      return true
    }
  };

  onDropImage = (accepted, rejectedFiles) => {
    const { errorDropzone } = this.state;
    const { onDropImage, onShowCropImageModal } = this.props;
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
      return;
    };

    if (errorDropzone) {
      this.setState({
        errorDropzone: false
      });
    };

    onShowCropImageModal();

    onDropImage(accepted, 'club-logo');
  };

  render() {
    const { isAnimate, errorInput, disableBtn, isShow, errorDropzone } = this.state;
    const { clubLogo, onChangeInput } = this.props;

    let classes = 'step step-2';
    let groupNameClasses = 'form-group d-flex flex-column';
    let groupPhotoClasses = 'form-group d-flex flex-column'
    let errorInputNotice = null
    let viewCropImage = null;
    let errorDropImageNotice = null;


    if (isAnimate) classes += ' animate';
    if (!isShow) classes += ' hidden';

    if (errorInput) {
      errorInputNotice = <div className="error-notice"><span>Only latin characters</span></div>;
      groupNameClasses += ' error';
    };

    if (errorDropzone) {
      errorDropImageNotice = <div className="error-notice"><span>file size should not exceed 2mb</span></div>;
      groupPhotoClasses += ' error';
    };

    if (clubLogo) {
      viewCropImage =
        <ReactCrop
          onComplete={this.onCropCompleted}
          onImageLoaded={this.onImageLoaded}
          crop={this.state.crop}
          onChange={this.onCropImage}
          src={clubLogo} />
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
            onDrop={this.onDropImage}
            maxSize={imageMaxSize}
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
          btnLabel="Next" btnAction={this.onChangeStep} />

        <ModalWindow title="Crop photo">
          {viewCropImage}
        </ModalWindow>
      </div>
    );
  };
};

export default FirstStep;