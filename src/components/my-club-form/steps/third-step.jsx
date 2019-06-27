import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Button from '../../button';

class ThirdStep extends Component {

  state = {
    disableBtn: true,
    errorInput: false,
  };

  componentWillUpdate({ trainerName, trainerPhoto, trainerBirthYear }) {
    // validation
    if(trainerName !== this.props.trainerName || trainerPhoto !== this.props.trainerPhoto || trainerBirthYear !== this.props.trainerBirthYear) {
      if(!trainerName.match("^[a-zA-Z]+$") && trainerName.length > 0) {
        this.setState({
          errorInput: true,
          disableBtn: true
        });
        return;
      } else {
        if(trainerPhoto !== null && trainerName.length > 0 && trainerBirthYear !== null) {
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

  render() {
    const { errorInput, disableBtn } = this.state;
    const { trainerPhoto, onDropImage, onChangeInput, onChangeBirthYear, trainerBirthYear, onToggleStep, classes } = this.props;
    const errorNotice = errorInput ? <div className="error-notice"><span>Only latin characters</span></div> : null;
    const viewZone = trainerPhoto ? <img src={trainerPhoto} alt="logo" /> : null;
    let groupClubNameClasses = "form-group d-flex flex-column";

    if (errorInput) groupClubNameClasses += ' error'

    return (
      <div className={classes}>
        <div className={groupClubNameClasses}>
          {errorNotice}
          <div className="input-group d-flex flex-column">
            <span className="title-form-group">Trainer name</span>
            <input
              type="text"
              placeholder="Enter trainer name"
              onChange={(e) => onChangeInput(e, 'trainer-name')} />
          </div>
        </div>
        <div className={groupClubNameClasses}>
          <div className="title-form-group">Trainer date of birth</div>
          <DatePicker
            customInput={<CustomInput dateValue={trainerBirthYear} />}
            dateFormat="yyyy-mm-dd"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
            minDate={new Date(1960, 0, 1)}
            onChange={(date) => onChangeBirthYear(date, 'trainer-birth-year')} />
          <ReactDropzone
            onDrop={(accepted) => onDropImage(accepted, 'trainer-photo')}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                {...getRootProps()}>
                <input {...getInputProps()} />
                {viewZone}
                <div className={"placeholder" + (trainerPhoto !== null ? ' hidden' : '')}>Select or drag trainer photo</div>
              </div>
            )}
          </ReactDropzone>
        </div>
        <Button 
            disable={false}
            classes="btn d-flex align-items-center" 
            btnLabel="Next" btnAction={onToggleStep} />
      </div>
    );
  };
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