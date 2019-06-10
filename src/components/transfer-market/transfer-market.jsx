import React from 'react';

import ItemList from '../item-list';
import SortingPanel from '../sorting-panel';
import ModalWindow from '../modal-window';
import BtnGroup from '../btn-group';
import ItemDetails, { DescriptionRecord } from '../item-details';

import './transfer-market.scss';

const TransferMarket = ({ selectedPlayer, items, onShowConfirmationModal, isShowModal, onPlayerSaleOrPurchase, money, purchaseError }) => {

  const renderBtns = (item) => {
    return (
      <BtnGroup 
        btnLabel={item.purchased ? 'Sell' : 'Buy'}
        btnAction={() => onShowConfirmationModal(item.id)}
        classes={item.purchased ? 'btn-primary' : 'btn-success'} />
    );
  };

  let modalWindow = <ModalWindow />;

  if(selectedPlayer) {

    const btnLabel = selectedPlayer.purchased ? `Yes, I want to sell ${selectedPlayer.name}` : `Yes, I want to buy ${selectedPlayer.name}`;

    modalWindow = 
      <ModalWindow 
        error={purchaseError}
        isShowModal={isShowModal}
        warningMessage={`You do not have enough money to buy ${selectedPlayer.name}`}
        title={`You are sure that do you want to buy ${selectedPlayer.name}? Sales value will be reduced by 20%`}>
        <ItemDetails item={selectedPlayer}>
          <DescriptionRecord label={'Accurate passes'} field={`${selectedPlayer.accuratePasses}%`} />
          <DescriptionRecord label={'Gold balls'} field={selectedPlayer.goldBalls} />
        </ItemDetails>
        <BtnGroup
          disable={purchaseError} 
          btnAction={() => onPlayerSaleOrPurchase(selectedPlayer, money)}
          btnLabel={btnLabel}
          classes={selectedPlayer.purchased ? 'btn-outline-primary' : 'btn-outline-success'} />
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
