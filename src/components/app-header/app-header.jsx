import React from 'react';
import { Link } from 'react-router-dom';

import './app-header.scss';
import logo from './fm_logo.png'

const AppHeader = () => {
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
      </div>
  </header>
  );
};

export default AppHeader;
