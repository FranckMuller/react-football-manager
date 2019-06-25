import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';

class SecondStep extends Component {

  state = {
    isAnimate: true
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        isAnimate: false
      });
    }, 2000)
  }

  render() {
    const { isAnimate } = this.state;
    const classes = isAnimate ? 'step step-2 animate' : 'step step-2';
    let groupClubNameClasses = "form-group d-flex flex-column";
    return (
      <div className={classes}>
        <div className={groupClubNameClasses}>
          <div className="input-group d-flex flex-column">
            <span className="title-form-group">Owner name</span>
            <input
              type="text"
              placeholder="Enter your  name"
              onChange={(e) => console.log(e, 'club-name')} />
          </div>
        </div>
        <div className={groupClubNameClasses}>
          <div className="title-form-group">Birth year</div>
          <DatePicker
            customInput={<CustomInput />}
            dateFormat="yyyy-mm-dd"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select" />
          <ReactDropzone
            onDrop={(accepted) => console.log(accepted)}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                {...getRootProps()}>
                <input {...getInputProps()} />
              </div>
            )}
          </ReactDropzone>
        </div>
      </div>
    );
  };
};

class CustomInput extends Component {
  render() {
    const { dateValue } = this.props;
    let view = <span className="placeholder">Select</span>
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
