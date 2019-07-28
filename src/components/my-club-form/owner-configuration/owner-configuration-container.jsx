import React, { Component } from 'react';
import OwnerConfiguration from './owner-configuration';
class OwnerConfigurationContainer extends Component {

  state = {
    errorInput: false,
    errorDropzone: false,
    inputValue: '',
    birthYear: '',
    selectedImage: null,
    croppedImageUrl: null
  };

  componentDidMount() {
    const { validateInput } = this.props;

    const nameInStorage = localStorage.getItem('owner-name');
    const photoInStorage = localStorage.getItem('owner-photo');
    const birthYearInStorage = localStorage.getItem('owner-birth-year');

    let valueInput = '';
    let photo = null;
    let birthYear = null;
    let errorInput = false;

    if (nameInStorage) valueInput = nameInStorage
    if (photoInStorage) photo = photoInStorage
    if (birthYearInStorage) birthYear = birthYearInStorage;
    if(!validateInput(nameInStorage)) errorInput = true;

    this.setState({
      inputValue: valueInput,
      selectedImage: photo,
      birthYear: birthYear,
      errorInput: errorInput
    });
  };

  onChangeInput = (e) => {
    e.preventDefault();
    const { validateInput } = this.props;

    localStorage.setItem('owner-name', e.target.value);

    if (!validateInput(e.target.value)) {
      this.setState({
        errorInput: true
      })
    } else {
      this.setState({
        inputValue: e.target.value,
        errorInput: false
      });
    };
  };

  onChangeBirthYear = (date) => {
    localStorage.setItem('owner-birth-year', date);

    this.setState({
      birthYear: date
    })
  };

  onDropImage = (accepted, rejectedFiles) => {
    const { verifyFile } = this.props;
    if (rejectedFiles && rejectedFiles.length > 0) {
      if (!verifyFile(rejectedFiles)) {
        this.setState({
          errorDropzone: true
        });
      };
    };

    if (accepted && accepted.length > 0) {
      const isVerified = verifyFile(accepted);
      if (isVerified) {
        const currentFile = accepted[0];
        const reader = new FileReader();
        reader.onload = () => {
          localStorage.setItem('owner-photo', reader.result);
          this.setState({
            selectedImage: reader.result,
            croppedImageUrl: reader.result,
            errorDropzone: false
          });
        };
        reader.readAsDataURL(currentFile);
      };
    };
  };

  onChangeStep = (e, stepCounter) => {
    e.preventDefault();
    const { onStepToggle } = this.props;

    if(stepCounter === 1) {
      const data = {
        ownerName: this.state.inputValue,
        ownerLogo: this.state.selectedImage,
        ownerBirthYear: this.state.birthYear
      }
      onStepToggle(stepCounter, data);
    } else {
      onStepToggle(stepCounter);
    };
  };

  onSubmitForm = (data) => {
    const { onStepToggle } = this.props;
    onStepToggle('next', -1, data);
  };


  render() {
    const { ...formProps } = this.state;
    const { animation, imageMaxSize } = this.props;
    let disableToggleStep = false;

    if (this.state.inputValue && this.state.selectedImage && !this.state.errorInput && !this.state.errorDropzone) {
      disableToggleStep = false;
    }
    return (
      <OwnerConfiguration 
        onDropImage={this.onDropImage}
        onChangeInput={this.onChangeInput}
        onChangeBirthYear={this.onChangeBirthYear}
        onSubmitForm={this.onSubmitForm}
        disableToggleStep={disableToggleStep}
        animation={animation}
        onChangeStep={this.onChangeStep}
        imageMaxSize={imageMaxSize} 
        {...formProps} />
    );
  };
};

export default OwnerConfigurationContainer;
