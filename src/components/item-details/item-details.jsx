import React from 'react';

import './item-details.scss';

const ItemDetails = ({ name, photo, position, ...props }) => {
  return (
    <div className="item-details d-flex flex-column justify-content-between">
      <div className="photo">
        <img src={photo} alt={name} />
      </div>
      <div className="description">
        <div className="name">{name}</div>
        <div className="position">Posisition: {position}</div>
      </div>
      <BtnGroup {...props } />
    </div>
  );
};

const BtnGroup = ({ leftBtn, rightBtn }) => {
  return (
    <div className="btn-group">
      <button className="btn btn-success">{leftBtn}</button>
      <button className="btn btn-danger">{rightBtn}</button>
    </div>
  );
};

export default ItemDetails;