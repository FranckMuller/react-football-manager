import React from 'react';
import ReactDropzone from 'react-dropzone';

import './my-club-form.scss'

const MyClubForm = ({ formFields, onDropImage, onChangeInput, onFormSubmit }) => {


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
};

export default MyClubForm;
