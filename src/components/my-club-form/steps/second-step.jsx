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
    const classes = isAnimate ? 'step-2 animate' : 'step-2';
    return (
      <div className={classes}>
          <div className="title text-center">asgsdfg</div>
          <div className="input-group d-flex flex-column">
            <div className="title-form-group flex-grow-1 flex-shrink-1">Name</div>
            <input
              type="text" />
          </div>
          <div className="input-group d-flex flex-column">
            <div className="title-form-group flex-grow-1 flex-shrink-1">Birth year</div>
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
