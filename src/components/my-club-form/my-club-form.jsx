import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import DatePicker  from 'react-bootstrap-date-picker';

import './my-club-form.scss'

class MyClubForm extends Component {

  state = {
    value: new Date().toISOString()
  };

  componentDidUpdate() {
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) 
  };

  render() {
    const { formFields, onDropImage, onChangeInput, onFormSubmit } = this.props;

    const fields = formFields.map(({label, name, image}) => {
      const viewZone = image !== null ? <img src={image} /> : <div className="placeholder">Select or drag {label} photo</div>;
      return (
        <div key={label} className="form-group d-flex flex-column">
          <div className="input-group d-flex flex-column">
            <div className="title-form-group flex-grow-1 flex-shrink-1">{label[0].toUpperCase() + label.slice(1)} name</div>
            <input 
              type="text"
              defaultValue={name} 
              placeholder={`Enter name ${label.toLowerCase()}`}
              onChange={(e) => onChangeInput(e, label)} />
          </div>
          <div className="input-group d-flex flex-column">
            <div className="title-form-group flex-grow-1 flex-shrink-1">{label[0].toUpperCase() + label.slice(1)} {label === 'Club' ? 'logo' : 'photo'}</div>
            <ReactDropzone
              onDrop={(accepted) => {onDropImage(accepted, label)}}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div 
                  className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                  {viewZone}
                </div>
              )}
            </ReactDropzone>
          </div>
          <DatePicker id="example-datepicker" value={this.state.value} />
        </div>
      );
    });

    return (
      <div className="my-club-form">
        <h3 className="title-page text-center">
          Club configuration
        </h3>
        <form action="" className="d-flex flex-wrap">
          {fields}
          <button onClick={onFormSubmit} className="btn">Submit</button>
        </form>
      </div>
    );
  }
};




export default MyClubForm;
