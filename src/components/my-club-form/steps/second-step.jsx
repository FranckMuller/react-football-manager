import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Button from '../../button';
import ReactCrop from 'react-image-crop';
import ModalWindow from '../../modal-window';

import 'react-image-crop/lib/ReactCrop.scss';

const imageMaxSize = 2000000;

class SecondStep extends Component {

  state = {
    isAnimate: true,
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

  componentWillUpdate({ ownerName, ownerPhoto, ownerBirthYear }) {
    // validation
    if (ownerName !== this.props.ownerName || ownerPhoto !== this.props.ownerPhoto || ownerBirthYear !== this.props.ownerBirthYear) {
      if (!ownerName.match("^[a-zA-Z]+$") && ownerName.length > 0) {
        this.setState({
          errorInput: true,
          disableBtn: true
        });
        return;
      } else {
        if (ownerPhoto !== null && ownerName.length > 0 && ownerBirthYear !== null) {
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
      onToggleStep(3)
    }, 500);
  };

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
  }

  onDropImage = (accepted, rejectedFiles) => {

    const { errorDropzone } = this.state;
    const { onDropImage, onShowCropImageModal } = this.props;
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
      return;
    };

    if(errorDropzone) {
      this.setState({
        errorDropzone: false
      });
    };

    onShowCropImageModal();
    onDropImage(accepted, 'owner-photo');
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
    const { isAnimate, errorInput, disableBtn, isShow, errorDropzone } = this.state;
    const { ownerPhoto, onChangeInput, onChangeBirthYear, ownerBirthYear } = this.props;

    let classes = 'step step-2';
    let groupNameClasses = 'form-group d-flex flex-column';
    let groupPhotoClasses = 'form-group d-flex flex-column'
    let errorInputNotice = null
    let viewCropImage = null;
    let errorDropImageNotice = null;

    if (isAnimate) classes += ' animate';
    if (!isShow) classes += ' hidden';

    if(errorInput) {
      errorInputNotice = <div className="error-notice"><span>Only latin characters</span></div>;
      groupNameClasses += ' error';
    };

    if(errorDropzone) {
      errorDropImageNotice = <div className="error-notice"><span>file size should not exceed 2mb</span></div>;
      groupPhotoClasses += ' error';
    };

    if (ownerPhoto) {
      viewCropImage =
        <ReactCrop
          onComplete={this.onCropCompleted}
          onImageLoaded={this.onImageLoaded}
          crop={this.state.crop}
          onChange={this.onCropImage}
          src={ownerPhoto} />
    };

    return (
      <div className={classes}>
        <div className={groupNameClasses}>
          {errorInputNotice}
          <div className="input-group d-flex flex-column">
            <div className="title-form-group">Owner name</div>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => onChangeInput(e, 'owner-name')} />
          </div>
        </div>

        <div className="form-group d-flex flex-column">
          <div className="title-form-group">Owner date of birth</div>
          <DatePicker
            customInput={<CustomInput dateValue={ownerBirthYear} />}
            dateFormat="yyyy-mm-dd"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
            minDate={new Date(1960, 0, 1)}
            onChange={(date) => onChangeBirthYear(date, 'owner-birth-year')} />

          <div className={groupPhotoClasses}>
            {errorDropImageNotice}
            <div className="title-form-group">Owner photo</div>
            <ReactDropzone
              onDrop={this.onDropImage}
              maxSize={imageMaxSize}
              accept='image/jpeg, image/png'>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className={"placeholder" + (ownerPhoto !== null ? ' hidden' : '')}>Select or drag your photo</div>
                  {ownerPhoto !== null ? <img src={ownerPhoto} /> : null}
                </div>
              )}
            </ReactDropzone>
          </div>
        </div>

        <Button
          disable={disableBtn}
          classes="btn d-flex align-items-center"
          btnLabel="Next" btnAction={this.onChangeStep} />

        <ModalWindow title="Crop photo">
          {viewCropImage}
        </ModalWindow>
      </div>
    );
  };
};

class CustomInput extends Component {
  render() {
    const { dateValue } = this.props;
    let view = <span className="placeholder">Select your date of birth</span>
    if (dateValue !== null) {
      view = <Moment format="MMMM Do YYYY">{dateValue}</Moment>
    };
    return (
      <div
        className="custom-input"
        onClick={this.props.onClick}>
        {view}
      </div>
    );
  };
};

export default SecondStep;
