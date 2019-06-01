import React, { Component } from 'react';

import './spinner.scss';

class Spinner extends Component {

  state = {
    left: '50%',
    top: '70%',
  };

  onUpdateCord = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    this.setState({
      left: `${x}px`,
      top: `${y}px`
    })
  }

  render() {

    return (
      <div 
        className="lds-css ng-scope flex-grow-1 flex-shrink-1 spinner d-flex align-items-center justify-content-center"
        onMouseMove={(e) => this.onUpdateCord(e)}
        onClick={(e) => this.onUpdateCord(e)}
        >
        <div style={this.state} className="lds-ball"><div>
        </div>
        </div>
      </div>
    );
  };
};

export default Spinner;