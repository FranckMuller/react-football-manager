import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';

import './modal-window.scss';

class ModalWindow extends Component {

  state = {
    isError: false
  }

  render() {
    const { isShowModal, title, onToggleModal} = this.props;
    const { isError } = this.state;

    let classes = "modal-window d-flex justify-content-center align-items-center";
    if(isShowModal) classes = classes + ' show';
    if(isError) {
      classes = classes + ' error';
    }

    return (
      <div className={classes}>
        <div className="modal-box">
          <div className="title">{title}</div>
          <div className="modal-box-content">
            {this.props.children}
          </div>
          <button 
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
