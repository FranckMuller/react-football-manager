import React from 'react';

import ItemList from '../item-list';
import SortingPanel from './sorting-panel-container';
import ModalWindow from '../modal-window';

import './transfer-market.scss';

const TransferMarket = ({ isShowModal, selectedPlayer, ...props }) => {
  return (
    <div className="transfer-market d-flex flex-column">
      <SortingPanel />
      <ItemList leftBtnLabel='Buy' rightBtnLabel='Sell' {...props} />
      <ModalWindow selectedPlayer={selectedPlayer} />
    </div>
  );

};

export default TransferMarket;
