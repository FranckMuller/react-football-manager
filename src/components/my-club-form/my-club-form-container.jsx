import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCroppedImg } from '../../utils/crop-image';
import { toggleStep } from '../../actions';
import BaseConfigurationContainer from './base-configuration';
import OwnerConfigurationContainer from './owner-configuration';

import MyClubForm from './my-club-form';

class MyClubFormContainer extends Component {

  state = {
    imageMaxSize: 2000000,
    croppedImageUrl: null,
    crop: {
      unit: "%",
      width: 100,
      aspect: 1 / 1
    }
  };

  validateInput(value) {
    const regExp = new RegExp(/^[a-zA-Z\sisShowStep]+$/);
    if (!regExp.test(value) && value.length > 0) {
      return false;
    } else {
      return true;
    };
  };

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileSize = currentFile.size
      if (currentFileSize > this.state.imageMaxSize) {
        return false;
      } else {
        return true;
      }
    }
  };

  onCropChange = (crop) => {
    this.setState({
      crop: crop
    });
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  imagePreviewCanvasRef = React.createRef();

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg",
        this.fileUrl
      );
      this.setState({
        croppedImageUrl: croppedImageUrl
      });
    }
  }

  onCropCompleted = (crop) => {
    this.makeClientCrop(crop);
  };

  render() {

    const { imageMaxSize } = this.state;
    const { step, animation, onStepToggle } = this.props;

    let stepView;

  switch (step) {
    case 1:
      stepView =
        <BaseConfigurationContainer
          onStepToggle={onStepToggle}
          validateInput={this.validateInput}
          verifyFile={this.verifyFile}
          animation={animation}
          imageMaxSize={imageMaxSize} >
        </BaseConfigurationContainer>
      break;

    case 2:
      stepView =
        <OwnerConfigurationContainer
          // onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'owner-photo')}
          onStepToggle={onStepToggle}
          validateInput={this.validateInput}
          verifyFile={this.verifyFile}
          animation={animation}
          imageMaxSize={imageMaxSize}
          // croppedImageUrl={croppedImageUrl}
          >
            

          {/* {cropView} */}

        </OwnerConfigurationContainer>
      break;

    // case 3:
    //   stepView =
    //     <ThirdStep
    //       disableToggleStep={disableToggleStep}
    //       classes={classesStep}
    //       errorDropzone={errorDropzone}
    //       errorInput={errorInput}
    //       imageMaxSize={imageMaxSize}
    //       onToggleStep={(e) => onToggleSteps(e, 4)}
    //       onChangeInput={onChangeInput}
    //       croppedImageUrl={croppedImageUrl}
    //       inputValue={inputValue}
    //       birthYear={birthYear}
    //       onChangeBirthYear={onChangeBirthYear}
    //       onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'trainer-photo')}>

    //       {cropView}

    //     </ThirdStep>
    //   break;

    // case 4:
    //   stepView =
    //     <FourthStep
    //       disableToggleStep={disableToggleStep}
    //       classes={classesStep}
    //       errorDropzone={errorDropzone}
    //       errorInput={errorInput}
    //       imageMaxSize={imageMaxSize}
    //       onFormSubmit={onFormSubmit}
    //       onChangeInput={onChangeInput}
    //       inputValue={inputValue}
    //       selectedImage={selectedImage}
    //       onDropImage={(accepted, rejectedFiles) => onDropImage(accepted, rejectedFiles, 'stadium-photo')} />
    //   break;

    default: return;
  };

    return (
      <MyClubForm stepView={stepView} />
    )
  };
};

const mapStateToProps = ({ myClub: { form } }) => {
  return {
    step: form.step,
    animation: form.animationStep
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStepToggle: (stepCounter, data) => toggleStep(dispatch, stepCounter, data)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClubFormContainer);
