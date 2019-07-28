import React, { Component } from 'react';
import BaseConfiguration from './base-configuration';

class BaseConfigurationContainer extends Component {

  state = {
    errorInput: false,
    errorDropzone: false,
    inputValue: '',
    selectedImage: null
  };

  componentDidMount() {
    const { validateInput } = this.props;

    const nameInStorage = localStorage.getItem('club-name');
    const logoInStorage = localStorage.getItem('club-logo');
    
    let valueInput = '';
    let logo = null;
    let errorInput = false;

    if(nameInStorage) valueInput = nameInStorage;
    if (logoInStorage) logo = logoInStorage;
    if(!validateInput(nameInStorage)) errorInput = true;

    this.setState({
      inputValue: valueInput,
      selectedImage: logo,
      errorInput: errorInput
    });
  };

  onChangeInput = (e) => {
    e.preventDefault();
    const { validateInput } = this.props;

    localStorage.setItem('club-name', e.target.value);

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
          localStorage.setItem('club-logo', reader.result);
          this.setState({
            selectedImage: reader.result,
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
        clubName: this.state.inputValue,
        clubLogo: this.state.selectedImage
      }
      onStepToggle(stepCounter, data);
    } else {
      onStepToggle(stepCounter);
    };
  };

  render() {
    const { ...formProps } = this.state;
    const { animation, imageMaxSize } = this.props;
    let disableToggleStep = false;

    if (this.state.inputValue && this.state.selectedImage && !this.state.errorInput && !this.state.errorDropzone) {
      disableToggleStep = true;
    }

    return (
      <BaseConfiguration
        onDropImage={this.onDropImage}
        onChangeInput={this.onChangeInput}
        onChangeStep={this.onChangeStep}
        disableToggleStep={disableToggleStep}
        animation={animation} 
        imageMaxSize={imageMaxSize}
        {...formProps} />
    )
  };
};

export default BaseConfigurationContainer;