import React from 'react';

import ItemList from '../item-list';
import SortingPanel from '../sorting-panel';
import ModalWindow from '../modal-window';
import BtnGroup from '../btn-group';
import ItemDetails, { DescriptionRecord } from '../item-details';

import './transfer-market.scss';

const TransferMarket = ({ selectedPlayer, items, preOrderPlayer, isShowModal, onBuyPlayer, money }) => {

  const renderBtns = (item) => {
    return (
      <BtnGroup 
        btnLabel={item.purchased ? 'Sell' : 'Buy'}
        btnAction={item.purchased ? () => console.log('sell') : () => preOrderPlayer(item.id)}
        classes={item.purchased ? 'btn-primary' : 'btn-success'} />
    );
  };

  let modalWindow = <ModalWindow />;

  if(selectedPlayer) {
    modalWindow = 
      <ModalWindow 
        error={selectedPlayer.cost > money}
        isShowModal={isShowModal}
        title={`You are sure that do you want to buy ${selectedPlayer.name}? Sales value will be reduced by 20%`}>
        <ItemDetails item={selectedPlayer}>
          <DescriptionRecord label={'Accurate passes'} field={`${selectedPlayer.accuratePasses}%`} />
          <DescriptionRecord label={'Gold balls'} field={selectedPlayer.goldBalls} />
        </ItemDetails>
        <BtnGroup 
          btnAction={() => onBuyPlayer(selectedPlayer, money)}
          btnLabel={`Yes, I want to buy ${selectedPlayer.name}`}
          classes={'btn-outline-success'} />
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
