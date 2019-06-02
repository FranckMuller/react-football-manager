import React from 'react';

import './item-details.scss';

const BtnGroup = ({ leftBtnLabel, rightBtnLabel, id, disabled = false, onToggleModal }) => {

  if(!leftBtnLabel && !rightBtnLabel) return null;

  return (
    <div className="btn-group">
      <button
        onClick={() => onToggleModal(true, id)} 
        disabled={disabled} 
        className="btn btn-success">{leftBtnLabel}</button>
      <button 
        onClick={() => onToggleModal(true, id)} 
        disabled={!disabled} className="btn btn-danger">{rightBtnLabel}</button>
    </div>
  );

};

const ItemDetails = (props) => {
  const { item: { name, image, position, cost, rating, bought, id}, ...btnProps } = props;

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
      <BtnGroup disabled={bought} id={id} {...btnProps } />
    </div>
  );
};

export default ItemDetails;