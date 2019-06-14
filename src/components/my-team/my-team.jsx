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

const MyCommand = ({ items, onShowConfigureModal, seletedPlayer, onPlayerConfigured }) => {

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
  if (seletedPlayer) {
    playerId = seletedPlayer.id;
    itemDetails =
      <ItemDetails item={seletedPlayer}>
        <DescriptionRecord label="Position" field="position" />
      </ItemDetails>
  }

  return (
    <div className="my-team container-fluid flex-grow-1 flex-shrink-1">
      <ItemList
        renderBtns={renderBtns}
        warningComponent={<WarningComponent />}
        items={items}>
        <ItemDetails>
          <DescriptionRecord label="Position" field="position" />
        </ItemDetails>
      </ItemList>
      <ModalWindow title='Configure player'>
        {itemDetails}
        <ConfigurePlayerForm itemId={playerId} onPlayerConfigured={onPlayerConfigured} />
      </ModalWindow>
    </div>
  );
};

export default MyCommand;
