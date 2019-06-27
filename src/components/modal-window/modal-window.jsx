import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';

import './modal-window.scss';

class ModalWindow extends Component {

  render() {
    const { isShowModal, title, onToggleModal, error = false, warningMessage = null } = this.props;
    let classes = "modal-window d-flex flex-column justify-content-center align-items-center";
    if(!isShowModal) return null;
    if(error) classes = classes + ' error';

    return (
      <div className={classes}>
        <div className="notice text-center">
          {warningMessage}
        </div>
        <div className="modal-box">
          <div className="title"><span>{title}</span></div>
          <div className="modal-box-content">
            {this.props.children}
          </div>
          <button 
            disabled={error}
            className="btn-close-modal"
            onClick={onToggleModal}></button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ modalWindow: { isShowModal } }) => {
  return {
    isShowModal: isShowModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: () => dispatch(toggleModal(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
