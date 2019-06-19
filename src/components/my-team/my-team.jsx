import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../item-list';
import Spinner from '../spinner';
import ItemDetails, { DescriptionRecord } from '../item-details';
import Button from '../button';
import ModalWindow from '../modal-window';
import ConfigurePlayerForm from '../configure-player-form';

import './my-team.scss';

const WarningComponent = () => {
  return (
    <div className="warning-component">
      <h3 className="title text-center">You do not have any purchased players, go to the <Link to="/transfer-market">transfer market</Link> to buy them</h3>
      <Spinner />
    </div>
  );
};

const MyTeam = ({ items, onShowConfigureModal, seletedItem, onPlayerConfigured, error }) => {

  const renderBtns = (item) => {
    return (
      <Button
        btnLabel={'Сonfigure player'}
        btnAction={() => onShowConfigureModal(item.id)}
        classes={'btn-primary'} />
    );
  };

  let itemDetails = null;
  let playerId;
  if (seletedItem) {
    playerId = seletedItem.id;
    itemDetails =
      <ItemDetails item={seletedItem}>
        <DescriptionRecord label="Position" field="position" />
        <DescriptionRecord label="Number" field="number" />
      </ItemDetails>
  };

  if(items.length < 1) {
    return (
      <WarningComponent />
    )
  }

  return (
    <div className="my-team container-fluid flex-grow-1 flex-shrink-1">
      <h3 className="title-page text-center">Here you can configure your players</h3>
      <ItemList
        renderBtns={renderBtns}
        items={items}>
        <ItemDetails>
          <DescriptionRecord label="Position" field="position" />
          <DescriptionRecord label="Number" field="number" />
        </ItemDetails>
      </ItemList>
      <ModalWindow 
        warningMessage='This number is already taken'
        error={error} 
        title='Configure player'>
        {itemDetails}
        <ConfigurePlayerForm error={error} items={items} item={seletedItem} itemId={playerId} onPlayerConfigured={onPlayerConfigured} />
      </ModalWindow>
    </div>
  );
};

export default MyTeam;
