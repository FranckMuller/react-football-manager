import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { updateMyClub } from '../../actions';

import MyClubForm from './my-club-form';

class MyClubFormContainer extends Component {

  state = {
    clubName: '',
    clubLogo: null,
    step: 1,
  };

  onToggleSteps = (value) => {
    this.setState({
      step: value
    });
  };

  transformLabel(label) {
    const idx = label.indexOf('-');
    const before = label.slice(0, idx);
    const after = label.slice(idx + 1);
    return before + lodash.capitalize(after);
  }

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
    this.props.onUpdateMyClub(this.state.formFields)
  };

  render() {

    const { clubLogo, clubName, step } = this.state;

    return (
      <MyClubForm 
        onFormSubmit={this.onFormSubmit}
        onChangeInput={this.onChangeInput}
        onDropImage={this.onDropImage} 
        onChangeBirthYear={this.onChangeBirthYear}
        clubLogo={clubLogo}
        clubName={clubName}
        step={step}
        onToggleSteps={this.onToggleSteps} />
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
    onUpdateMyClub: (data) => dispatch(updateMyClub(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClubFormContainer);