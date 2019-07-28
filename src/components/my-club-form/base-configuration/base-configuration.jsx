import React from 'react';
import ReactDropzone from 'react-dropzone';
import Button from '../../button';

const BaseConfiguration = ({ inputValue, onChangeStep, errorInput, selectedImage, onChangeInput, animation, onDropImage, errorDropzone, imageMaxSize, disableToggleStep }) => {

  let groupNameClasses = 'form-group d-flex flex-column';
  let groupPhotoClasses = 'form-group d-flex flex-column';
  let errorInputNotice = null
  let errorDropImageNotice = null;
  let classesStep = 'step';

  if (animation) classesStep = `step ${animation}`;

  if (errorInput) {
    errorInputNotice = <div className="error-notice"><span>Only latin characters</span></div>;
    groupNameClasses += ' error';
  };

  if (errorDropzone) {
    errorDropImageNotice = <div className="error-notice"><span>file size should not exceed 2mb</span></div>;
    groupPhotoClasses += ' error';
  };

  return (
    <div className={classesStep}>
      <div className={groupNameClasses}>
        {errorInputNotice}
        <span className="title-form-group">Club name</span>
        <input
          defaultValue={inputValue}
          type="text"
          placeholder="Enter your club name"
          onChange={onChangeInput} />
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
              className={"dropzone d-flex align-items-end justify-content-center" + (isDragActive ? ' active' : '') + (errorDropzone ? ' error' : '')}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={"placeholder" + (selectedImage !== null ? ' hidden' : '')}>Select or drag club logo</div>
              {selectedImage !== null ? <img src={selectedImage} alt="club logo" /> : null}
            </div>
          )}
        </ReactDropzone>
      </div>
      <div className="btn-group justify-content-end">
        <Button
          disable={disableToggleStep}
          classes="d-flex align-items-center next"
          btnLabel="Next" btnAction={(e) => onChangeStep(e, 1)} />
      </div>
    </div>
  );
};

export default BaseConfiguration;
