import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import Button from '../../button';

class SecondStep extends Component {

  state = {
    isAnimate: true,
    disableBtn: true,
    isShow: true,
    errorInput: false,
  };

  componentWillUpdate({ ownerName, ownerPhoto, ownerBirthYear }) {
    // validation
    if(ownerName !== this.props.ownerName || ownerPhoto !== this.props.ownerPhoto || ownerBirthYear !== this.props.ownerBirthYear) {
      if(!ownerName.match("^[a-zA-Z]+$") && ownerName.length > 0) {
        this.setState({
          errorInput: true,
          disableBtn: true
        });
        return;
      } else {
        if(ownerPhoto !== null && ownerName.length > 0 && ownerBirthYear !== null) {
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

  render() {
    const { isAnimate, errorInput, disableBtn, isShow } = this.state;
    const { ownerPhoto, onDropImage, onChangeInput, onChangeBirthYear, ownerBirthYear } = this.props;
    const errorNotice = errorInput ? <div className="error-notice"><span>Only latin characters</span></div> : null;
    const viewZone = ownerPhoto ? <img src={ownerPhoto} alt="owner" /> : null;
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
            <span className="title-form-group">Owner name</span>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => onChangeInput(e, 'owner-name')} />
          </div>
        </div>
        <div className={groupClubNameClasses}>
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
          <ReactDropzone
            onDrop={(accepted) => onDropImage(accepted, 'owner-photo')}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                {...getRootProps()}>
                <input {...getInputProps()} />
                {viewZone}
                <div className={"placeholder" + (ownerPhoto !== null ? ' hidden' : '')}>Select or drag your photo</div>
              </div>
            )}
          </ReactDropzone>
        </div>
        <Button 
            disable={disableBtn}
            classes="btn d-flex align-items-center" 
            btnLabel="Next" btnAction={this.onChangeStep} />
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
