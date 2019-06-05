import React, { Component } from 'react';
import { connect } from 'react-redux';

import './modal-window.scss';

class ModalWindow extends Component {
  render() {
    const { isShowModal, title } = this.props;
    let classes = "modal-window d-flex justify-content-center align-items-center";
    if(isShowModal) classes = classes + ' show';

    return (
      <div className={classes}>
        <div className="modal-box">
          <div className="title">{title}</div>
          <div className="modal-box-content">
            {this.props.children}
          </div>
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

export default connect(mapStateToProps, null)(ModalWindow);
