import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ReactDropzone from 'react-dropzone';
import Moment from 'react-moment';
import Button from '../../button';

const OwnerConfiguration = ({ inputValue, errorInput, onChangeInput, animation, onChangeBirthYear, birthYear, onDropImage,
  errorDropzone, imageMaxSize, disableToggleStep, children, onChangeStep, croppedImageUrl }) => {

  let classesStep = 'step';
  let groupNameClasses = 'form-group d-flex flex-column';
  let groupPhotoClasses = 'form-group d-flex flex-column';
  let errorInputNotice = null
  let errorDropImageNotice = null;
  let cropContainer = null;

  if (animation) classesStep = `step ${animation}`;

  if (children) {
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
    <div className={classesStep}>
      <div className={groupNameClasses}>
        {errorInputNotice}
        <div className="input-group d-flex flex-column">
          <div className="title-form-group">Owner name</div>
          <input
            defaultValue={inputValue}
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
            className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '') + (errorDropzone ? ' error' : '')}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={"placeholder" + (croppedImageUrl !== null ? ' hidden' : '')}>Select or drag your photo</div>
              <div>{croppedImageUrl ? <img src={croppedImageUrl} alt="" /> : null}</div>
            </div>
          )}
        </ReactDropzone>
        {cropContainer}
      </div>

      <div className="btn-group justify-content-between">
        <Button
          disable={disableToggleStep}
          classes="d-flex align-items-center prev"
          btnLabel="Prev" btnAction={(e) => onChangeStep(e, -1)} />
        <Button
          disable={disableToggleStep}
          classes="d-flex align-items-center next"
          btnLabel="Next" btnAction={(e) => onChangeStep(e, 1)} />
      </div>

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

export default OwnerConfiguration;