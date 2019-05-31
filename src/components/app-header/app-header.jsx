import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './app-header.scss';
import logo from './fm_logo.gif'

const AppHeader = ({ money }) => {
  return (
    <header className="header">
      <div className="container d-flex">
        <div className="logo d-flex align-items-center">
          <Link to="/">
            <img src={logo} alt="logo"/>
          </Link>
        </div>
        <ul className="nav list-unstyled justify-content-end flex-shrink-1 flex-grow-1">
          <li className="d-flex align-items-center">
            <Link to="/transfer-market">transfer market</Link>
          </li>
        </ul>
        <div className="your-money d-flex justify-content-end align-items-center">
          <i className="fa fa-money"></i> {money}
        </div>
      </div>
  </header>
  );
};

const mapStateToProps = ({ transferMarket: { money } }) => {
  return {
    money: money
  };
};

export default connect(mapStateToProps)(AppHeader);
