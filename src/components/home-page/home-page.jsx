import React, { Component } from 'react';

import Spinner from "../spinner";

import './home-page.scss';


class HomePage extends Component {

  state = {
    classes: "home-page d-flex flex-column flex-grow-1 flex-shrink-1"
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        classes: this.state.classes + ' animate'
      });
    }, 1000);
  };

  render() {

    return (
      <div className={this.state.classes}>
        <div className="welcome-message text-center">Welcome to "Top 100 players"<br /> football manager!!!</div>
        <Spinner />
      </div>
    );
  };
};

export default HomePage;
