import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import ItemDetails from '../item-details';

import './modal-window.scss';

const ModalWindow = ({ isShowModal, onToggleModal, selectedPlayer }) => {

  let classes = "modal-window d-flex justify-content-center align-items-center"
  if(isShowModal) classes = classes + ' show'

  return (
    <div className={classes}>
      <div className="modal-window-content">
        <div className="title">You are sure that are you want to buy {selectedPlayer.name}?</div>
        <ItemDetails item={selectedPlayer} />
        <div className="btn-group d-flex">
          <button className="btn btn-success flex-grow-1 flex-shrink-1">Buy</button>
          <button 
            className="btn btn-danger flex-grow-1 flex-shrink-1"
            onClick={() => onToggleModal(false)}>
              Cancel
            </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ isShowModal }) => {
  return {
    isShowModal: isShowModal
  };
};

const dispatchToProps = (dispatch) => {
  return {
    onToggleModal: (value) => dispatch(toggleModal(value))
  }
}

export default connect(mapStateToProps, dispatchToProps)(ModalWindow);
