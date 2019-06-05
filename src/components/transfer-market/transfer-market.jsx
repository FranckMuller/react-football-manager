import React from 'react';

import ItemList from '../item-list';
import SortingPanel from '../sorting-panel';
import ModalWindow from '../modal-window';
import BtnGroup from '../btn-group';
import ItemDetails, { DescriptionRecord } from '../item-details';

import './transfer-market.scss';

const TransferMarket = ({ selectedPlayer, items, preOrderPlayer, onToggleModal, isShowModal }) => {

  const renderBtns = (item) => {
    return (
      <BtnGroup 
        leftBtnLabel='Buy'
        rightBtnLabel='Sell' 
        leftBtnAction={() => preOrderPlayer(item.id)}
        leftBtnDisabled={item.bought}
        rightBtnDisabled={!item.bought} />
    );
  };

  let modalWindow = <ModalWindow />;

  if(selectedPlayer) {
    modalWindow = 
      <ModalWindow isShowModal={isShowModal} title={`You are sure that do you want to buy ${selectedPlayer.name}?`}>
        <ItemDetails item={selectedPlayer}>
          <DescriptionRecord label={'Accurate passes'} field={`${selectedPlayer.accuratePasses}%`} />
          <DescriptionRecord label={'Gold balls'} field={selectedPlayer.goldBalls} />
        </ItemDetails>
        <BtnGroup 
          rightBtnAction={onToggleModal}
          leftBtnLabel={`Yes, I want to buy ${selectedPlayer.name}`} />
      </ModalWindow>
  };

  return (
    <div className="transfer-market d-flex flex-column">
      <SortingPanel />
      <ItemList items={items} renderBtns={renderBtns} />
      {modalWindow}
    </div>
  );

};

export default TransferMarket;
