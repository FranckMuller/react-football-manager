import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../item-list';
import Spinner from '../spinner';
import ItemDetails, { DescriptionRecord } from '../item-details';
import Button from '../button';

import './my-command.scss';

const renderBtns = () => {
  return (
    <Button
      btnLabel={'Сonfigure player'}
      btnAction={() => console.log('option player')}
      classes={'btn-primary'} />
  );
};

const WarningComponent = () => {
  return (
    <div className="warning-component">
      <h3 className="title text-center">You do not have any purchased players, go to the <Link to="/transfer-market">transfer market</Link> to buy them</h3>
      <Spinner />
    </div>
  );
};

const MyCommand = (props) => {
  return (
    <div className="my-command container-fluid flex-grow-1 flex-shrink-1">
      <ItemList
        renderBtns={renderBtns}
        warningComponent={<WarningComponent />}
        {...props}>
        <ItemDetails>
          <DescriptionRecord label="Position" field="position" />
        </ItemDetails>
      </ItemList>
    </div>
  );
};

export default MyCommand;
