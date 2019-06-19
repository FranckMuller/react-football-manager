import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleModal } from '../../actions';

import './app-header.scss';
import logo from './fm_logo.gif'

const FormattingMoney = ({ money }) => {
    let text = 'm';
    let number = String(money);

    if(number.length > 9) {
      text = 'bln';
      number = number.slice(0, -9) + text;
    } else {
      text = 'm';
      number = number.slice(0, -6) + text;
    };

  return <span>{number}</span>
}

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
          {/* <FormattingMoney money={money} />  */}
          <NumberFormat value={money} displayType={'text'} fixedDecimalScale={true} thousandSeparator={','} prefix={'$'} />
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
