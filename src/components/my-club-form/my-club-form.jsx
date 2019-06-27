import React, { Component } from 'react';
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './steps';

import ModalWindow from './../modal-window';
import ReactCrop from 'react-image-crop';

import 'moment-timezone';

import 'react-datepicker/dist/react-datepicker.css';

import './my-club-form.scss'

class MyClubForm extends Component {

  state = {
    crop: {
      unit: "px",
      width: 30,
      aspect: 1 / 1
    }
  };

  render() {

    const {
      completedDropImage,
      clubLogo,
      onChangeInput,
      step,
      onToggleSteps,
      clubName,
      ownerPhoto,
      ownerName,
      ownerBirthYear,
      onChangeBirthYear,
      trainerName,
      trainerPhoto,
      trainerBirthYear,
      stadiumName,
      stadiumPhoto,
      onFormSubmit,
      onShowCropImageModal,
      isShow,
      onDropImage,
      errorDropzone,
      currentDropImage } = this.props;

    let cropImageModal = null;
    if (currentDropImage !== null) {
      cropImageModal =
        <ModalWindow title="Crop photo">
          <ReactCrop
            // onComplete={this.onCropCompleted}
            // onImageLoaded={this.onImageLoaded}
            crop={this.state.crop}
            onChange={() => {}}
            src={currentDropImage} />
        </ModalWindow>
    };

    let stepView;
    let classesStep = 'step';
    if(isShow) classesStep += ' showed';
    if(!isShow) classesStep += ' hided';
    switch (step) {
      case 1: 
        stepView =
          <FirstStep
            classes={classesStep}
            errorDropzone={errorDropzone}
            onToggleStep={(e) => onToggleSteps(e, 2)}
            onChangeInput={onChangeInput}
            clubLogo={clubLogo}
            clubName={clubName}
            onShowCropImageModal={onShowCropImageModal}
            onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'club-logo')}>

            {cropImageModal}

          </FirstStep>
        break;
      // case 2: 
      //   stepView =
      //     <SecondStep
      //       classes={classesStep}
      //       onToggleStep={(e) => onToggleSteps(e, 3)}
      //       onChangeInput={onChangeInput}
      //       onDropImage={onDropImage}
      //       ownerPhoto={ownerPhoto}
      //       ownerName={ownerName}
      //       ownerBirthYear={ownerBirthYear}
      //       onChangeBirthYear={onChangeBirthYear}
      //       onShowCropImageModal={onShowCropImageModal} />
      //   break;

      // case 3: 
      //   stepView =
      //     <ThirdStep
      //       classes={classesStep}
      //       onToggleStep={(e) => onToggleSteps(e, 4)}
      //       onChangeInput={onChangeInput}
      //       onDropImage={onDropImage}
      //       trainerName={trainerName}
      //       trainerPhoto={trainerPhoto}
      //       trainerBirthYear={trainerBirthYear}
      //       onChangeBirthYear={onChangeBirthYear} />
      //   break;

      // case 4:
      //   stepView = 
      //     <FourthStep
      //       classes={classesStep}
      //       onFormSubmit={onFormSubmit}
      //       onChangeInput={onChangeInput}
      //       onDropImage={onDropImage}
      //       stadiumName={stadiumName}
      //       stadiumPhoto={stadiumPhoto} />
      //   break;

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
