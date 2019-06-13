import React from 'react';

import goldBall from './gold-ball.png';

const DescriptionRecord = ({ item, label, field }) => {
  let classes = `d-flex justify-content-between description-item`;

  if(!item[field]) {
    return null;
  }

  switch (field) {
    case 'goldBalls':
      let goldBalls = [];
      classes = classes + ' gold-balls';

      console.log(item[field]);

      if(item[field] <= 0) {
        return null;
      }
      
      for (let i = 0; i < item[field]; i++) {
        goldBalls.push(
          <span key={i} className="gold-balls d-flex">
            <img src={goldBall} alt="gold ball" />
          </span>
        );
      }

      return (
        <div className={classes}>
          <span className="field-label">{label}:</span>
          <span className="icon d-flex">
            {goldBalls.length !== 0 ? goldBalls : 0}
          </span>
        </div>
      );

    case 'position':
      return (
        <div className={classes}>
          <span className="field-label">{label}:</span>
          <span className={item[field]}>{item[field]}</span>
        </div>
      );

    case 'cost':
      let costPlayer = item.cost;
      if (item.purchased === true) {
        costPlayer = costPlayer - item.cost / 5;
      }
      return (
        <div className={classes}>
          <span className="field-label">{label}:</span>
          <span>{costPlayer}$</span>
        </div>
      );

    default:
      return (
        <div className={classes}>
          <span className="field-label">{label}:</span>
          <span>{item[field]}</span>
        </div>
      );
  };
};

export default DescriptionRecord;
