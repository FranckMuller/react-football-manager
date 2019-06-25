import React, { Component, Fragment } from 'react';
import ReactDropzone from 'react-dropzone';
import Button from '../../button';

class FirstStep extends Component {

  state = {
    errorInput: false,
    disableBtn: true,
    isShow: true
  };

  componentWillUpdate({ clubName, clubLogo }) {
    // validation
    if(clubName !== this.props.clubName || clubLogo !== this.props.clubLogo) {
      if(!clubName.match("^[a-zA-Z]+$") && clubName.length > 0) {
        this.setState({
          errorInput: true,
          disableBtn: true
        });
        return;
      } else {
        if(clubLogo !== null && clubName.length > 0) {
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

  toggleAnimateClass() {
    this.setState({
      isShow: false
    });
  };

  onChangeStep = (e) => {
    e.preventDefault();
    const { onToggleSteps } = this.props;

    this.toggleAnimateClass();

    setTimeout(() => {
      onToggleSteps(2)
    }, 500);
  }

  render() {
    const { onDropImage, clubLogo, onChangeInput } = this.props;
    const { errorInput, disableBtn, isShow } = this.state;
    const viewZone = clubLogo ? <img src={clubLogo} alt="logo" /> : null;
    const errorNotice = errorInput ? <div className="error-notice"><span>Only latin characters</span></div> : null;
    let groupClubNameClasses = "form-group d-flex flex-column";
    if (errorInput) groupClubNameClasses = groupClubNameClasses + ' error'

    return (
      <div className={"step-1" + (isShow ? '' : ' hidden')}>
        <div className={groupClubNameClasses}>
          {errorNotice}
          <span className="title-form-group">Club name</span>
          <input
            type="text"
            placeholder="Enter your club name"
            onChange={(e) => onChangeInput(e, 'club-name')} />
        </div>
        <div className="form-group d-flex flex-column">
          <div className="title-form-group">Club logo</div>
          <ReactDropzone
            onDrop={(accepted) => { onDropImage(accepted, 'club-logo') }}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                {...getRootProps()}>
                <input {...getInputProps()} />
                {viewZone}
                <div className={"placeholder" + (clubLogo !== null ? ' hidden' : '')}>Select or drag club logo</div>
              </div>
            )}
          </ReactDropzone>
        </div>
        <Button 
            disable={false}
            classes="btn d-flex align-items-center" 
            btnLabel="Next" btnAction={this.onChangeStep} />
      </div>
    );
  };
};

export default FirstStep;