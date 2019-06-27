import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import Button from '../../button';

class FourthStep extends Component {

  state = {
    errorInput: false,
    disableBtn: true,
  };

  componentWillUpdate({ stadiumName, stadiumPhoto }) {
    // validation
    if(stadiumName !== this.props.stadiumName || stadiumPhoto !== this.props.stadiumPhoto) {
      if(!stadiumName.match("^[a-zA-Z]+$") && stadiumName.length > 0) {
        this.setState({
          errorInput: true,
          disableBtn: true
        });
        return;
      } else {
        if(stadiumPhoto !== null && stadiumName.length > 0) {
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
    const { onDropImage, stadiumPhoto, onChangeInput, onFormSubmit, classes } = this.props;
    const { errorInput, disableBtn } = this.state;
    const viewZone = stadiumPhoto ? <img src={stadiumPhoto} alt="logo" /> : null;
    const errorNotice = errorInput ? <div className="error-notice"><span>Only latin characters</span></div> : null;
    let groupStadiumNameClasses = "form-group d-flex flex-column";
    if (errorInput) groupStadiumNameClasses = groupStadiumNameClasses + ' error'

    return (
      <div className={classes}>
        <div className={groupStadiumNameClasses}>
          {errorNotice}
          <span className="title-form-group">Stadium name</span>
          <input
            type="text"
            placeholder="Enter your club name"
            onChange={(e) => onChangeInput(e, 'stadium-name')} />
        </div>
        <div className="form-group d-flex flex-column">
          <div className="title-form-group">Stadium photo</div>
          <ReactDropzone
            onDrop={(accepted) => { onDropImage(accepted, 'stadium-photo') }}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                {...getRootProps()}>
                <input {...getInputProps()} />
                {viewZone}
                <div className={"placeholder" + (stadiumPhoto !== null ? ' hidden' : '')}>Select or drag club logo</div>
              </div>
            )}
          </ReactDropzone>
        </div>
        <Button 
            disable={disableBtn}
            classes="btn d-flex align-items-center" 
            btnLabel="Submit"
            btnAction={onFormSubmit} />
      </div>
    );
  };
};

export default FourthStep;
