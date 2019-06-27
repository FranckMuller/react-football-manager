import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { updateMyClub, toggleModal } from '../../actions';

import MyClubForm from './my-club-form';

const imageMaxSize = 100000000;

class MyClubFormContainer extends Component {

  state = {
    errorDropzone: false,
    isShow: true,
    clubName: '',
    clubLogo: null,
    ownerName: '',
    ownerPhoto: null,
    ownerBirthYear: null,
    trainerName: '',
    trainerPhoto: null,
    trainerBirthYear: null,
    staidumName: '',
    stadiumPhoto: null,
    currentDropImage: null,
    step: 1
  };

  interval = null;

  onToggleSteps = (e, value) => {
    e.preventDefault();
    this.setState({
      isShow: !this.state.isShow
    });

    this.interval = setTimeout(() => {
      this.setState({
        step: value,
        isShow: !this.state.isShow
      });
    }, 500);
  };

  transformLabel(label) {
    const arr = label.split('-');
    let newLabel = '';
    arr.forEach((el, idx) => {
      if(idx < 1) {
        newLabel += el;
      } else {
        newLabel += lodash.capitalize(el);
      }
    });

    return newLabel
  };

  onChangeInput = (e, label) => {
    const newLabel = this.transformLabel(label);
    this.setState({
      [newLabel]: e.target.value,
    });
  };

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileSize = currentFile.size
      if (currentFileSize > imageMaxSize) {
        this.setState({
          errorDropzone: true
        });
        return false
      }
      return true
    }
  };

  completedDropImage = (accepted, label) => {
    this.getBase64(accepted[0], label);
  };

  getBase64(file, label) {
    const { onShowCropImageModal } = this.props;
    const newLabel = this.transformLabel(label);
    var reader = new FileReader();
    reader.onload = () => {
      onShowCropImageModal();
      this.setState({
        [newLabel]: reader.result,
        currentDropImage: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  onDropImage = (accepted, rejectedFiles, label) => {
    const { errorDropzone } = this.state;
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
      return;
    };

    this.completedDropImage(accepted, label);

    if (errorDropzone) {
      this.setState({
        errorDropzone: false
      });
    };
  };


  onFormSubmit = (e) => {
    e.preventDefault();
    const 
      { clubName, clubLogo,
        ownerName, ownerPhoto,
        ownerBirthYear, trainerName, 
        trainerPhoto, trainerBirthYear,
        staidumName, stadiumPhoto } = this.state;

    const data = {
      club: {
        clubName,
        clubLogo
      },
      owner: {
        ownerName,
        ownerPhoto,
        ownerBirthYear
      },
      trainer: {
        trainerName,
        trainerPhoto,
        trainerBirthYear
      },
      stadium: {
        staidumName,
        stadiumPhoto
      }
    };
    
    this.props.onUpdateMyClub(data)
  };

  onChangeBirthYear = (date, label) => {
    const newLabel = this.transformLabel(label);
    this.setState({
      [newLabel]: date
    });
  };

  render() {

    const { ...formProps } = this.state;

    return (
      <MyClubForm 
        onFormSubmit={this.onFormSubmit}
        onChangeInput={this.onChangeInput}
        completedDropImage={this.completedDropImage} 
        onToggleSteps={this.onToggleSteps}
        onChangeBirthYear={this.onChangeBirthYear}
        onShowCropImageModal={this.props.onShowCropImageModal}
        toggleAnimateClass={this.toggleAnimateClass}
        onDropImage={this.onDropImage}
        {...formProps} />
    )
  };
};

const mapStateToProps = ({ myClub }) => {
  return {
    myClub: myClub
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMyClub: (data) => dispatch(updateMyClub(data)),
    onShowCropImageModal: () => dispatch(toggleModal(true))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClubFormContainer);