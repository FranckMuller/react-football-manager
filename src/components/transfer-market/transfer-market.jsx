import React from 'react';

import ItemList from '../item-list';

const TransferMarket = ({ items }) => {

  const attackPlayers = items.filter(({ position }) => position === 'attack');
  const halfBackPlayers = items.filter(({ position }) => position === 'half-back');
  const goalkeepers = items.filter(({ position }) => position === 'goalkeeper');

  return (
    <div className="container item-list-container">
      <div className="title">Attack</div>
      <ItemList leftBtn='Buy' rightBtn='Sell' items={attackPlayers} />

      <div className="title">Half Back</div>
      <ItemList leftBtn='Buy' rightBtn='Sell' items={halfBackPlayers} />

      <div className="title">Goalkeeper</div>
      <ItemList leftBtn='Buy' rightBtn='Sell' items={goalkeepers} />

    </div> 
  );
};

export default TransferMarket;