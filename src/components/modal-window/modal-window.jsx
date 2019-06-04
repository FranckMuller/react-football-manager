import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions'

import ItemDetails, { DescriptionRecord } from '../item-details';
import BtnGroup from '../btn-group';


import './modal-window.scss';

const ModalWindow = ({ isShowModal, selectedPlayer, onToggleModal }) => {
  let classes = "modal-window d-flex justify-content-center align-items-center"
  if(isShowModal) classes = classes + ' show'

  return (
    <div className={classes}>
      <div className="modal-box">
        <div className="title">You are sure that do you want to buy {selectedPlayer.name}?</div>
        <div className="modal-box-content">
          <ItemDetails item={selectedPlayer}>
            <DescriptionRecord label={'Accurate passes'} field={`${selectedPlayer.accuratePasses}%`} />
            <DescriptionRecord label={'Gold balls'} field={selectedPlayer.goldBalls} />
          </ItemDetails>
          <BtnGroup 
            rightBtnAction={onToggleModal}
            leftBtnLabel={`Yes, I want to buy ${selectedPlayer.name}`} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: () => dispatch(toggleModal(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
