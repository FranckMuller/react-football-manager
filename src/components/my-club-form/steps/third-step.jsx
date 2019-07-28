import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Button from '../../button';

const ThirdStep = ({ errorInput, croppedImageUrl, onChangeInput, onChangeBirthYear, birthYear, onToggleStep, classes, onDropImage, errorDropzone, imageMaxSize, disableToggleStep, children }) => {

  let groupNameClasses = 'form-group d-flex flex-column';
  let groupPhotoClasses = 'form-group d-flex flex-column'
  let errorInputNotice = null
  let errorDropImageNotice = null;
  let cropContainer = null;

  if(children) {
    cropContainer = 
      <div className="crop">
        <div className="title">Crop image</div>
        {children};
      </div>
  };

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
          <span className="title-form-group">Trainer name</span>
          <input
            type="text"
            placeholder="Enter trainer name"
            onChange={(e) => onChangeInput(e, 'trainer-name')} />
        </div>
      </div>
      <div className={groupPhotoClasses}>
        {errorDropImageNotice}
        <div className="title-form-group">Trainer date of birth</div>
        <DatePicker
          customInput={<CustomInput dateValue={birthYear} />}
          dateFormat="yyyy-mm-dd"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
          minDate={new Date(1960, 0, 1)}
          onChange={(date) => onChangeBirthYear(date, 'trainer-birth-year')} />
        <ReactDropzone
          onDrop={onDropImage}
          maxSize={imageMaxSize}
          accept='image/jpeg, image/png'>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={"placeholder" + (croppedImageUrl !== null ? ' hidden' : '')}>Select or drag trainer photo</div>
              {croppedImageUrl !== null ? <img src={croppedImageUrl} alt="trainer" /> : null}
            </div>
          )}
        </ReactDropzone>
      </div>
      <Button
        disable={disableToggleStep}
        classes="btn d-flex align-items-center"
        btnLabel="Next" btnAction={onToggleStep} />

      {cropContainer}
    </div>
  );
};

class CustomInput extends Component {
  render() {
    const { dateValue } = this.props;
    let view = <span className="placeholder">Select trainer date of birth</span>
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

export default ThirdStep;