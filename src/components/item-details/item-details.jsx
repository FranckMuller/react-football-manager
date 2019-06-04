import React, { Component } from 'react';

import './item-details.scss';

import goldBall from './gold-ball.png';

const DescriptionRecord = ({label, field}) => {

  let classes = `d-flex justify-content-between description-item`;
  let goldBalls = [];

  if(label === 'Gold balls' && Number(field) > 0) {
    classes = classes + ' gold-balls'
    for(let i = 0; i < field; i++) {
      goldBalls.push(
        <span key={i} className="gold-balls d-flex">
          <img src={goldBall} alt="gold ball" />
        </span>
      ); 
    };

    return (
      <div className={classes}>
        <span className="field-label">{label}:</span>
        <span className="icon d-flex">
          {goldBalls}
        </span>
      </div>
    );
  };

  return (
    <div className={classes}>
      <span className="field-label">{label}:</span>
      <span>{field}</span>
    </div>
  );
};

export {
  DescriptionRecord
}

class ItemDetails extends Component {

  render() {

    let child = null;
    if (this.props.children) {
      child = this.props.children;
    }

    const { item: { name, image, position, cost, rating }} = this.props;

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
          <div className="position d-flex justify-content-between description-item">
            <span className="field-label">Posisition:</span>
            <span>{position}</span>
          </div>
          <div className="cost d-flex justify-content-between description-item">
            <span className="field-label">Cost:</span>
            <span>{cost}$</span>
          </div>
          {child}
        </div>
      </div>
    );
  };
};

export default ItemDetails;