import React from 'react';
import ReactDropzone from 'react-dropzone';
import Button from '../../button';

const FirstStep = ({ errorInput, selectedImage, onChangeInput, onToggleStep, classes, onDropImage, errorDropzone, imageMaxSize, disableToggleStep }) => {

  let groupNameClasses = 'form-group d-flex flex-column';
  let groupPhotoClasses = 'form-group d-flex flex-column'
  let errorInputNotice = null
  let errorDropImageNotice = null;

  if (errorInput) {
    errorInputNotice = <div className="error-notice"><span>Only latin characters</span></div>;
    groupNameClasses += ' error';
  };

  if (errorDropzone) {
    errorDropImageNotice = <div className="error-notice"><span>file size should not exceed 2mb</span></div>;
    groupPhotoClasses += ' error';
  };

  return (
    <div className={classes}>
      <div className={groupNameClasses}>
        {errorInputNotice}
        <span className="title-form-group">Club name</span>
        <input
          type="text"
          placeholder="Enter your club name"
          onChange={(e) => onChangeInput(e, 'club-name')} />
      </div>
      <div className={groupPhotoClasses}>
        {errorDropImageNotice}
        <div className="title-form-group">Club logo</div>
        <ReactDropzone
          onDrop={onDropImage}
          maxSize={imageMaxSize}
          accept='image/jpeg, image/png'>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '')}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={"placeholder" + (selectedImage !== null ? ' hidden' : '')}>Select or drag club logo</div>
              {selectedImage !== null ? <img src={selectedImage} /> : null}
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

export default FirstStep;
