import React from 'react';

import ItemList from '../item-list';
import MarketPanel from './market-panel';

import './transfer-market.scss';

const TransferMarket = ({ items }) => {

  return (
    <div className="transfer-market d-flex flex-column">
      <MarketPanel />
      <ItemList leftBtn='Buy' rightBtn='Sell' items={items} />
    </div>
  );

};

export default TransferMarket;