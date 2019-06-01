import React from 'react';

import './item-details.scss';

const ItemDetails = ({ name, image, position, cost, rating, ...props }) => {
  return (
    <div className="item-details d-flex flex-column justify-content-between">
      <div className="name text-center">{name}</div>
      <div className="rating text-center">
        <i className="fa fa-star" /> {rating}
      </div>
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

const BtnGroup = ({ leftBtn, rightBtn, bought = false }) => {
  return (
    <div className="btn-group">
      <button disabled={bought} className="btn btn-success">{leftBtn}</button>
      <button disabled={!bought} className="btn btn-danger">{rightBtn}</button>
    </div>
  );
};

export default ItemDetails;