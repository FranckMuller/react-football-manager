import React, { Component } from 'react';

import './item-details.scss';

class ItemDetails extends Component {

  renderLogos = (logo) => {
    const imageUrl = require(`./../../assets/images/${logo}.png`)
    return {
      backgroundImage: `url(${imageUrl})`
    }
  }



  render() {

    const { item } = this.props;
    let logo;
    let classes = "item-details d-flex flex-column justify-content-between";
    let description = null;

    if (item.purchased) classes += ' purchased';
    if(item.captain) classes += ' captain';

    if(item.club) {
      logo = <div className="club-logo" style={this.renderLogos(this.props.item.club)}></div>
    } else {
      logo = null;
    }

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
        {logo}
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