import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortPlayers } from '../../actions';

import './market-panel.scss';

class MarketPanel extends Component {

  state = {
    buttons: [
      {
        label: 'All players',
        sort: 'all'
      },
      {
        label: 'Attack',
        sort: 'attack'
      },
      {
        label: 'Half Back',
        sort: 'half-back'
      },
      {
        label: 'Goalkepeer',
        sort: 'goalkeeper'
      },
    ]
  }

  renderButtons(arr) {
    const { onSorted, sortingValue } = this.props;

    return arr.map(({ label, sort }) => {
      let classes = "flex-shrink-1 flex-grow-1";
      if(sort === sortingValue) classes = classes + ' active';
      
      return (
        <li key={sort} className={classes}>
          <button 
            className="btn btn-light"
            onClick={() => onSorted(sort)} >
            {label}
          </button>
        </li>
      )
    });
  }

  render() {
    const { buttons } = this.state;
    const items = this.renderButtons(buttons)
    return (
      <div className="market-panel">
        <ul className="nav justify-content-between">
          {items}
        </ul>
      </div>
    );
  };
};

const mapStateToProps = ({ transferMarket: { sortingValue } }) => {
  return {
    sortingValue: sortingValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSorted: (value) => dispatch(sortPlayers(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketPanel);
