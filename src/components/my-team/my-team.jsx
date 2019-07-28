import React from 'react';
import ItemList from '../item-list';
import ItemDetails, { DescriptionRecord } from '../item-details';
import Button from '../button';
import ModalWindow from '../modal-window';
import ConfigurePlayerForm from '../configure-player-form';

import './my-team.scss';

const MyTeam = ({ items, onShowConfigureModal, seletedItem, onPlayerConfigured, error }) => {

  const renderBtns = (item) => {
    return (
      <div className="btn-group">
        <Button
          btnLabel={'Сonfigure player'}
          btnAction={() => onShowConfigureModal(item.id)}
          classes={'btn-primary'} />
      </div>
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

  return (
    <div className="my-team container-fluid flex-grow-1 flex-shrink-1">
      <h3 className="title-page text-center">Players configuration</h3>
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
