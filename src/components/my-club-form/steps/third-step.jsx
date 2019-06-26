import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Button from '../../button';

class ThirdStep extends Component {

  state = {
    isAnimate: true,
    disableBtn: true,
    isShow: true,
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

  onChangeStep = (e, step) => {
    e.preventDefault();
    const { onToggleStep } = this.props;

    this.toggleAnimateClass();

    setTimeout(() => {
      onToggleStep(step)
    }, 500);
  };

  render() {
    const { isAnimate, errorInput, disableBtn, isShow } = this.state;
    const { trainerPhoto, onDropImage, onChangeInput, onChangeBirthYear, trainerBirthYear } = this.props;
    const errorNotice = errorInput ? <div className="error-notice"><span>Only latin characters</span></div> : null;
    const viewZone = trainerPhoto ? <img src={trainerPhoto} alt="logo" /> : null;
    let classes = 'step step-2';
    let groupClubNameClasses = "form-group d-flex flex-column";
    if(isAnimate) classes += ' animate';
    if(!isShow) classes += ' hidden';
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
            disable={disableBtn}
            classes="btn d-flex align-items-center" 
            btnLabel="Next" btnAction={(e) => this.onChangeStep(e, 4)} />
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