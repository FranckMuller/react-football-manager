import React, { Component } from 'react';

import './market-panel.scss';

class MarketPanel extends Component {

  render() {
    return (
      <div className="market-panel">
        <ul className="nav justify-content-between">
          <li className="flex-shrink-1 flex-grow-1 active">
            <button className="btn btn-light">
              All players
            </button>
          </li>
          <li className="flex-shrink-1 flex-grow-1">
            <button className="btn btn-light">
              Attack
            </button>
          </li>
          <li className="flex-shrink-1 flex-grow-1">
            <button className="btn btn-light">
              Half Back
            </button>
          </li>
          <li className="flex-shrink-1 flex-grow-1">
            <button className="btn btn-light">
              Goalkepeer
            </button>
          </li>
        </ul>
      </div>
    );
  };
};

export default MarketPanel;
