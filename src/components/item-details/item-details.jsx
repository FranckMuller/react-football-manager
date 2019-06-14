import React, { Component } from 'react';

import './item-details.scss';

class ItemDetails extends Component {

  render() {

    const { item } = this.props;
    let classes = "item-details d-flex flex-column justify-content-between";
    if (item.purchased) classes += ' purchased';
    if(item.captain) classes += ' captain'
    let description = null;
    if (this.props.children) {
      description =
        <div className="description">
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item })
            })
          }
        </div>
    }

    return (
      <div className={classes}>
        <div className="name text-center">{item.name}</div>
        <div className="rating text-center">
          <i className="fa fa-star" /> {item.rating}
        </div>
        <div className="photo">
          <img src={item.image} alt={item.name} />
        </div>
        {description}
      </div>
    );
  };
};

export default ItemDetails;