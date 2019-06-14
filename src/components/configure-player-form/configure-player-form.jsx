import React, { Component } from 'react';

import './configure-player-form.scss';

class ConfigurePlayerForm extends Component {

  state = {
    checkBoxValue: false,
    selectValue: 'right winger'
  }

  onSubmitFrom = (e) => {
    e.preventDefault();
    const { onPlayerConfigured, itemId } = this.props;
    const { checkBoxValue, selectValue } = this.state;
    const data = {
      captain: checkBoxValue,
      position: selectValue
    }
    onPlayerConfigured(data, itemId);
  };

  onCheckboxChange = (e) => {
    this.setState({
      checkBoxValue: e.target.checked
    });
  };

  onChangeSelect = (e) => {
    this.setState({
      selectValue: e.target.value
    });
  }

  render() {

    const { checkBoxValue, selectValue } = this.state;

    return (
      <div className="configure-player-form">
        <form>
          <div className="form-group d-flex justify-content-between align-items-center">
            <label htmlFor="">Captain's armband</label>
            <input 
              onChange={this.onCheckboxChange}
              type="checkbox"
              checked={checkBoxValue} />
          </div>
          <div className="form-group d-flex justify-content-between align-items-center">
            <label htmlFor="">Position</label>
            <select value={selectValue} onChange={this.onChangeSelect}>
              <option value="right winger">Right winger</option>
              <option value="central winger">Central winger</option>
              <option value="left winger">Left winger</option>
              <option value="right halfback">Right halfback</option>
              <option value="central halfback">Central halfback</option>
              <option value="left halfback">Left halfback</option>
              <option value="right defender">Right defender</option>
              <option value="central defender">Central defender</option>
              <option value="left defender">Left defender</option>
              <option value="goalkeeper">Goalkeeper</option>
            </select>
          </div>
          <button 
            className="btn btn-outline-primary"
            onClick={this.onSubmitFrom}>
            Submit</button>
        </form>
      </div>
    );
  };
};

export default ConfigurePlayerForm;