import React from 'react';

import ItemList from '../item-list';
import SortingPanel from './sorting-panel-container';
import ModalWindow from '../modal-window';
import BtnGroup from '../btn-group';

import './transfer-market.scss';

const TransferMarket = ({ selectedPlayer, items, preOrderPlayer }) => {

  const renderBtns = (item) => {
    return (
      <BtnGroup 
        leftBtnLabel='Buy'
        rightBtnLabel='Sell' 
        leftBtnAction={() => preOrderPlayer(item.id)}/>
    );
  };

  return (
    <div className="transfer-market d-flex flex-column">
      <SortingPanel />
      <ItemList items={items} renderBtns={renderBtns} />
      <ModalWindow selectedPlayer={selectedPlayer} />
    </div>
  );

};

export default TransferMarket;
