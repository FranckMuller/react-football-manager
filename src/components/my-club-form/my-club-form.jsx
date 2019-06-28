import React, { Component } from 'react';
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './steps';
import { getCroppedImg } from '../../utils/crop-image';

import ReactCrop from 'react-image-crop';

import 'moment-timezone';

import 'react-datepicker/dist/react-datepicker.css';

import './my-club-form.scss'

class MyClubForm extends Component {

  state = {
    crop: {
      unit: "%",
      width: 30,
      aspect: 1/1
    }
  };

  imagePreviewCanvasRef = React.createRef();

  onCropChange = (crop) => {
    this.setState({
      crop: crop
    });
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg",
        this.fileUrl
      );
      this.setState({ croppedImageUrl });
    }
  }

  onCropCompleted = (crop) => {
    this.makeClientCrop(crop);
  };

  render() {

    const {
      onChangeInput,
      step,
      onToggleSteps,
      onChangeBirthYear,
      onFormSubmit,
      onShowCropImageModal,
      isShow,
      onDropImage,
      errorDropzone,
      errorInput,
      selectedImage,
      inputValue,
      birthYear,
      imageMaxSize,
      disableToggleStep } = this.props;

    let cropView = null;
    if (selectedImage !== null) {
      cropView =
        <div className="crop-container d-flex flex-column justify-content-center align-items-center">
          <ReactCrop
            onComplete={this.onCropCompleted}
            onImageLoaded={this.onImageLoaded}
            crop={this.state.crop}
            onChange={this.onCropChange}
            src={selectedImage} />
        </div>
    };

    let stepView;
    let classesStep = 'step';
    if (isShow) classesStep += ' showed';
    if (!isShow) classesStep += ' hided';

    switch (step) {
      case 1:
        stepView =
          <FirstStep
            disableToggleStep={disableToggleStep}
            classes={classesStep}
            imageMaxSize={imageMaxSize}
            errorDropzone={errorDropzone}
            errorInput={errorInput}
            onToggleStep={(e) => onToggleSteps(e, 2)}
            onChangeInput={onChangeInput}
            selectedImage={selectedImage}
            inputValue={inputValue}
            onShowCropImageModal={onShowCropImageModal}
            onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'club-logo')}>
          </FirstStep>
        break;
      case 2: 
        stepView =
          <SecondStep
            disableToggleStep={disableToggleStep}
            classes={classesStep}
            errorDropzone={errorDropzone}
            errorInput={errorInput}
            imageMaxSize={imageMaxSize}
            onToggleStep={(e) => onToggleSteps(e, 3)}
            onChangeInput={onChangeInput}
            selectedImage={selectedImage}
            inputValue={inputValue}
            birthYear={birthYear}
            onChangeBirthYear={onChangeBirthYear}
            onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'owner-photo')}>
              
            {cropView}

            {this.state.croppedImageUrl && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedImageUrl} />
            )}

          </SecondStep>
        break;

      case 3: 
        stepView =
          <ThirdStep
            disableToggleStep={disableToggleStep}
            classes={classesStep}
            errorDropzone={errorDropzone}
            errorInput={errorInput}
            imageMaxSize={imageMaxSize}
            onToggleStep={(e) => onToggleSteps(e, 4)}
            onChangeInput={onChangeInput}
            selectedImage={selectedImage}
            inputValue={inputValue}
            birthYear={birthYear}
            onChangeBirthYear={onChangeBirthYear}
            onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'trainer-photo')}>

            {cropView} 

          </ThirdStep>    
        break;

      case 4:
        stepView = 
          <FourthStep
            disableToggleStep={disableToggleStep}
            classes={classesStep}
            errorDropzone={errorDropzone}
            errorInput={errorInput}
            imageMaxSize={imageMaxSize}
            onFormSubmit={onFormSubmit}
            onChangeInput={onChangeInput}
            onDropImage={onDropImage}
            inputValue={inputValue}
            selectedImage={selectedImage}
            onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'stadium-photo')} />
        break;

      default: return;
    };

    return (
      <div className="my-club-form d-flex flex-column align-items-center">
        <h3 className="title-page text-center">
          Club configuration
        </h3>
        <form action="" className="d-flex flex-column align-items-center">
          {stepView}
        </form>
      </div>
    );
  };
};

export default MyClubForm;
