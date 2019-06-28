import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Button from '../../button';

import 'react-image-crop/lib/ReactCrop.scss';

const SecondStep = ({ errorInput, selectedImage, onChangeInput, onChangeBirthYear, birthYear, onToggleStep, classes, onDropImage, errorDropzone, imageMaxSize, disableToggleStep, children }) => {

  let groupNameClasses = 'form-group d-flex flex-column';
  let groupPhotoClasses = 'form-group d-flex flex-column'
  let errorInputNotice = null
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
          customInput={<CustomInput dateValue={birthYear} />}
          dateFormat="yyyy-mm-dd"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
          minDate={new Date(1960, 0, 1)}
          onChange={(date) => onChangeBirthYear(date, 'owner-birth-year')} />
      </div>

      <div className={groupPhotoClasses}>
        {errorDropImageNotice}
        <div className="title-form-group">Owner photo</div>
        <ReactDropzone
          onDrop={onDropImage}
          maxSize={imageMaxSize}
          accept='image/jpeg, image/png'>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={"placeholder" + (selectedImage !== null ? ' hidden' : '')}>Select or drag your photo</div>
              {selectedImage !== null ? <img src={selectedImage} /> : null}
            </div>
          )}
        </ReactDropzone>
      </div>

      <Button
        disable={false}
        classes="btn d-flex align-items-center"
        btnLabel="Next" btnAction={onToggleStep} />

      {children}
    </div>
  );
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
