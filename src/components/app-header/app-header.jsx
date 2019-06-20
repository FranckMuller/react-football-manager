import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleModal } from '../../actions';
import FormattingMoney from '../hoc/formatting-number';

import './app-header.scss';
import logo from './fm_logo.gif'

const AppHeader = ({ money, onClearModal, history, isShowModal }) => {

  return (
    <header className="header">
      <div className="container-fluid d-flex">
        <div className="logo d-flex align-items-center">
          <Link
            onClick={(e) => onClearModal(e, history.location.pathname, isShowModal)}
            to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav list-unstyled justify-content-end flex-shrink-1 flex-grow-1">
        <li className="d-flex align-items-center">
            <Link 
              onClick={(e) => onClearModal(e, history.location.pathname, isShowModal)}
              to="/my-club">my club</Link>
          </li>
          <li className="d-flex align-items-center">
            <Link 
              onClick={(e) => onClearModal(e, history.location.pathname, isShowModal)}
              to="/my-team">my team</Link>
          </li>
          <li className="d-flex align-items-center">
            <Link
              onClick={(e) => onClearModal(e, history.location.pathname, isShowModal)} 
              to="/transfer-market">transfer market</Link>
          </li>
        </ul>
        <div className="your-money d-flex justify-content-end align-items-center">
          <i className="fa fa-money"></i>
          <FormattingMoney money={money} /> 
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = ({ transferMarket: { money }, modalWindow: { isShowModal }}) => {
  return {
    money: money,
    isShowModal
  };
};

const mapDispatchoProps = (dispatch) => {
  return {
    onClearModal: (e, pathname, isShowModal) => dispatch(toggleModal((String(e.target.href).indexOf(pathname) !== -1) && isShowModal !== false))
  };
};

export default connect(mapStateToProps, mapDispatchoProps)(withRouter(AppHeader));
