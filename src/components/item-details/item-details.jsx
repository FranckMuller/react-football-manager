import React from 'react';

import './item-details.scss';

const ItemDetails = ({ name, image, position, cost, ...props }) => {
  return (
    <div className="item-details d-flex flex-column justify-content-between">
      <div className="name text-center">{name}</div>
      <div className="photo">
        <img src={image} alt={name} />
      </div>
      <div className="description">
        <div className="position d-flex justify-content-between">
          <span>Posisition:</span>
          <span className="font-weight-bold">{position}</span>
        </div>
        <div className="cost d-flex justify-content-between">
          <span>Cost:</span>
          <span className="font-weight-bold">{cost}$</span>
        </div>
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