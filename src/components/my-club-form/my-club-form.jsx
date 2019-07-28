import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'moment-timezone';

import 'react-datepicker/dist/react-datepicker.css';

import './my-club-form.scss'

class CropContainer extends Component {

  render() {
    const { onCropCompleted, onImageLoaded, crop, onCropChange, selectedImage } = this.props;

    let classesCropContainer = 'crop-container d-flex flex-column justify-content-center align-items-center';

    if (!selectedImage) return null;

    return (
      <div className={classesCropContainer}>
        <ReactCrop
          onComplete={onCropCompleted}
          onImageLoaded={onImageLoaded}
          crop={crop}
          onChange={onCropChange}
          src={selectedImage} />
      </div>
    );
  };
};

const MyClubForm = ({ stepView }) => {

  // let cropView = null;
  // if (selectedImage !== null) {
  //   cropView =
  //     <CropContainer
  //       onCropCompleted={onCropCompleted}
  //       onImageLoaded={onImageLoaded}
  //       crop={crop}
  //       onCropChange={onCropChange}
  //       selectedImage={selectedImage} />
  // };

  return (
    <div className="my-club-form d-flex flex-column align-items-center">
      <h3 className="title-page text-center">Club configuration</h3>
      <form action="" className="d-flex flex-column align-items-center">
        {stepView}
      </form>
    </div>
  );
};

export default MyClubForm;
