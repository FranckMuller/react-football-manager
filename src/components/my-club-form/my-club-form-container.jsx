import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { updateMyClub } from '../../actions';

import MyClubForm from './my-club-form';

class MyClubFormContainer extends Component {

  state = {
    disableToggleStep: false,
    errorDropzone: false,
    errorInput: false,
    isShow: true,
    selectedImage: null,
    inputValue: '',
    birthYear: null,
    step: 1,
    imageMaxSize: 100000000,
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1
    }
  };

  interval = null;

  componentWillUpdate(prevProps, { inputValue, selectedImage, birthYear }) {
    // validation
    switch (this.state.step) {
      case 2:
      case 3:
        if (inputValue !== this.state.inputValue || selectedImage !== this.state.selectedImage || birthYear !== this.state.birthYear) {
          if (!inputValue.match("^[a-zA-Z]+$") && inputValue.length > 0) {
            this.setState({
              errorInput: true,
              disableToggleStep: true
            });
            return;
          } else {
            if (selectedImage !== null && inputValue.length > 0 && birthYear !== null) {
              this.setState({
                errorInput: false,
                disableToggleStep: false
              });
              return;
            }
            this.setState({
              errorInput: false,
              disableToggleStep: true
            });
            return;
          };
        };
        break;

      case 1:
      case 4:
        if (inputValue !== this.state.inputValue || selectedImage !== this.state.selectedImage) {
          if (!inputValue.match("^[a-zA-Z]+$") && inputValue.length > 0) {
            this.setState({
              errorInput: true,
              disableToggleStep: true
            });
            return;
          } else {
            if (selectedImage !== null && inputValue.length > 0) {
              this.setState({
                errorInput: false,
                disableToggleStep: false
              });
              return;
            }
            this.setState({
              errorInput: false,
              disableToggleStep: true
            });
            return;
          };
        };
        break;
    }
  };

  componentDidUpdate() {
    console.log(this.state);
  };

  onToggleSteps = (e, value) => {
    e.preventDefault();
    this.setState({
      isShow: !this.state.isShow
    });

    this.interval = setTimeout(() => {
      console.log(value);
      this.setState({
        step: value,
        isShow: !this.state.isShow,
        selectedImage: null,
        inputValue: '',
        birthYear: null,
        errorDropzone: false
      });
    }, 500);
  };

  transformLabel(label) {
    const arr = label.split('-');
    let newLabel = '';
    arr.forEach((el, idx) => {
      if (idx < 1) {
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
      inputValue: e.target.value,
    });
  };

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileSize = currentFile.size
      if (currentFileSize > this.state.imageMaxSize) {
        this.setState({
          errorDropzone: true
        });
        return false;
      }
      return true;
    }
  };

  onDropImage = (accepted, rejectedFiles, label) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    };

    if (accepted && accepted.length > 0) {
      const isVerified = this.verifyFile(accepted)
      if (isVerified) {
        const currentFile = accepted[0];
        const reader = new FileReader();
        reader.onload = () => {
          const newLabel = this.transformLabel(label);
          this.setState({
            [newLabel]: reader.result,
            selectedImage: reader.result,
            errorDropzone: false
          });
        };
        reader.readAsDataURL(currentFile);
      };
    };
  };

  // submit form
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
      [newLabel]: date,
      birthYear: date
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClubFormContainer);
