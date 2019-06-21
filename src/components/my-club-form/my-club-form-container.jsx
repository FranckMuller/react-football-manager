import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMyClub } from '../../actions';

import MyClubForm from './my-club-form';

class MyClubFormContainer extends Component {

  state = {
    formFields: [
      {
        label: 'owner',
        image: null,
        name: ''
      },
      {
        label: 'club',
        image: null,
        name: ''
      },
      {
        label: 'trainer',
        image: null,
        name: ''
      },
      {
        label: 'stadium',
        image: null,
        name: ''
      }
    ]
  };

  onDropImage = (accepted, label) => {
    this.getBase64(accepted[0], label);
  };

  getBase64(file, label) {
    var reader = new FileReader();
    reader.onload = () => {
      const idx = this.state.formFields.findIndex((el) => el.label === label)
      const item = this.state.formFields.find((el) => el.label === label);
      const newItem = {
        ...item,
        image: reader.result
      }
      this.setState({
        formFields: [
          ...this.state.formFields.slice(0, idx),
          newItem,
          ...this.state.formFields.slice(idx + 1)
        ]
      });
    };
    reader.readAsDataURL(file);
  };

  onChangeInput = (e, label) => {
      e.preventDefault();
      const idx = this.state.formFields.findIndex((el) => el.label === label)
      const item = this.state.formFields.find((el) => el.label === label);
      const newItem = {
        ...item,
        name: e.target.value
      }
      this.setState({
        formFields: [
          ...this.state.formFields.slice(0, idx),
          newItem,
          ...this.state.formFields.slice(idx + 1)
        ]
      });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.formFields)
    this.props.onUpdateMyClub(this.state.formFields)
  };

  render() {
    const { formFields } = this.state;
    return (
      <MyClubForm 
        onFormSubmit={this.onFormSubmit}
        onChangeInput={this.onChangeInput}
        onDropImage={this.onDropImage} 
        formFields={formFields}  />
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMyClub: (data) => dispatch(updateMyClub(data))
  }
};

export default connect(null, mapDispatchToProps)(MyClubFormContainer);