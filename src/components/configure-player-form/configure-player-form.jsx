import React, { Component } from 'react';
import Button from '../button';

import './configure-player-form.scss';

class ConfigurePlayerForm extends Component {

  state = {
    captain: false,
    position: 'Choose here',
    number: '',
    warning: false
  }

  clearInterval;

  componentDidMount() {
    if (this.props.item) {
      const { captain = false, position, number = '' } = this.props.item;
      this.setState({
        captain,
        position,
        number,
      })
    };
  };

  componentWillUnmount() {
    clearTimeout(this.clearInterval);
  };

  onSubmitFrom = (e) => {
    e.preventDefault();
    const { onPlayerConfigured, itemId, items } = this.props;
    const { captain = false, position, number } = this.state;
    const data = {
      captain,
      position,
      number
    }
    onPlayerConfigured(data, itemId, items);
  };

  onCheckboxChange = (e) => {
    this.setState({
      captain: e.target.checked
    });
  };

  onChangeSelect = (e) => {
    this.setState({
      position: e.target.value
    });
  };

  onChangeInput = (e) => {
    if (e.target.value.length > 3) {
      this.setState({
        warning: true
      });

      this.clearInterval = setTimeout(() => {
        this.setState({
          warning: false
        });
      }, 1000);
    } else {
      this.setState({
        number: e.target.value,
        warning: false
      });
    };
  };

  render() {

    const { captain, number, position, warning } = this.state;
    const { error } = this.props;
    let classes = "form-group d-flex justify-content-between align-items-center"

    if (warning) classes += ' warning';

    return (
      <div className="configure-player-form">
        <form>
          <div className={classes}>
            <label htmlFor="numberPlayer">Number</label>
            <input
              readOnly={warning}
              onChange={this.onChangeInput}
              value={number}
              id="numberPlayer"
              className="form-control"
              type="number"
              placeholder="Enter a number" />
            <span className="warning-message">maximum 3 characters</span>
          </div>

          <div className="form-group d-flex justify-content-between align-items-center">
            <label htmlFor="positionPlayer">Position</label>
            <select id="positionPlayer" value={position} onChange={this.onChangeSelect}>
              <option value="default" hidden>Select position</option>
              <option value="right winger">right winger</option>
              <option value="central winger">central winger</option>
              <option value="left winger">left winger</option>
              <option value="right halfback">right halfback</option>
              <option value="central halfback">central halfback</option>
              <option value="left halfback">left halfback</option>
              <option value="right defender">right defender</option>
              <option value="central defender">central defender</option>
              <option value="left defender">left defender</option>
              <option value="goalkeeper">goalkeeper</option>
            </select>
          </div>

          <div className="form-group d-flex justify-content-between align-items-center armband">
            <label htmlFor="armband" className="d-flex justify-content-between align-items-center">Captain's armband
            <input
                id="armband"
                onChange={this.onCheckboxChange}
                type="checkbox"
                checked={captain} />
              <div></div>
            </label>
          </div>
          <Button 
            btnLabel="Submit"
            disable={error}
            btnAction={this.onSubmitFrom}
            classes="btn btn-outline-primary" />
        </form>
      </div>
    );
  };
};

export default ConfigurePlayerForm;
