import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { updateMyClub, toggleModal } from '../../actions';

import MyClubForm from './my-club-form';

class MyClubFormContainer extends Component {

  state = {
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
    step: 1,
  };

  onToggleSteps = (value) => {
    this.setState({
      step: value
    });
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

  getBase64(file, label) {
    const newLabel = this.transformLabel(label);
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        [newLabel]: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  onChangeInput = (e, label) => {
    const newLabel = this.transformLabel(label);
    this.setState({
      [newLabel]: e.target.value,
    });
  };

  onDropImage = (accepted, label) => {
    this.getBase64(accepted[0], label);
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
        onDropImage={this.onDropImage} 
        onToggleSteps={this.onToggleSteps}
        onChangeBirthYear={this.onChangeBirthYear}
        onShowCropImageModal={this.props.onShowCropImageModal}
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