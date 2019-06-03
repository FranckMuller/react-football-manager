import React from 'react';
import { connect } from 'react-redux';
import ItemDetails from '../item-details';


import './modal-window.scss';

const DescriptionRecord = ({label, field}) => {
  return (
    <div className="position d-flex justify-content-between">
      <span>{label}</span>
      <span className="font-weight-bold">{field}</span>
    </div>
  )
};

const ModalWindow = ({ isShowModal, selectedPlayer }) => {
  let classes = "modal-window d-flex justify-content-center align-items-center"
  if(isShowModal) classes = classes + ' show'

  return (
    <div className={classes}>
      <div className="modal-window-content">
        <div className="title">You are sure that are you want to buy {selectedPlayer.name}?</div>
        <ItemDetails item={selectedPlayer}>
          <DescriptionRecord label={'Passes'} field={23} />
        </ItemDetails>
        <div className="btn-group d-flex">
          <button className="btn btn-success flex-grow-1 flex-shrink-1">Buy</button>
          <button 
            className="btn btn-danger flex-grow-1 flex-shrink-1">
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

export default connect(mapStateToProps, null)(ModalWindow);
