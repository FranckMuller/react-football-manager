import React, { Component } from 'react';
import { FirstStep, SecondStep, ThirdStep, FourthStep } from './steps';

import 'moment-timezone';

import 'react-datepicker/dist/react-datepicker.css';

import './my-club-form.scss'

class MyClubForm extends Component {

  render() {
    const {
      onDropImage,
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
      onFormSubmit } = this.props;

    let stepView;
    switch (step) {
      case 1: 
        stepView =
          <FirstStep
            onToggleStep={onToggleSteps}
            onChangeInput={onChangeInput}
            onDropImage={onDropImage}
            clubLogo={clubLogo}
            clubName={clubName} />
        break;
      case 2: 
        stepView =
          <SecondStep
            onToggleStep={onToggleSteps}
            onChangeInput={onChangeInput}
            onDropImage={onDropImage}
            ownerPhoto={ownerPhoto}
            ownerName={ownerName}
            ownerBirthYear={ownerBirthYear}
            onChangeBirthYear={onChangeBirthYear} />
        break;

      case 3: 
        stepView =
          <ThirdStep
            onToggleStep={onToggleSteps}
            onChangeInput={onChangeInput}
            onDropImage={onDropImage}
            trainerName={trainerName}
            trainerPhoto={trainerPhoto}
            trainerBirthYear={trainerBirthYear}
            onChangeBirthYear={onChangeBirthYear} />
        break;

      case 4:
        stepView = 
          <FourthStep
            onFormSubmit={onFormSubmit}
            onChangeInput={onChangeInput}
            onDropImage={onDropImage}
            stadiumName={stadiumName}
            stadiumPhoto={stadiumPhoto} />
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
