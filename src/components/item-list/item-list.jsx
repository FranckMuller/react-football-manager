import React, { Component } from 'react';

import ItemDetails from '../item-details';

import './item-list.scss';

class ItemList extends Component {

  render() {
    const { items, renderBtns = null } = this.props;

    if(renderBtns) {
      return (
        <ul className="item-list d-flex flex-wrap">
          {
            items.map((item) => {
              return (
                <li key={item.id}>
                    <div className="d-flex li-content flex-column">
                      <ItemDetails item={item} />
                      { renderBtns(item) }
                    </div>
                </li>
              );
            })
          }
        </ul>
      )
    }

    return (
      <ul className="item-list d-flex flex-wrap">
        {
          items.map((item) => {
            return (
              <li key={item.id}>
                <ItemDetails {...item} />
              </li>
            );
          })
        }
      </ul>
    );
  };
};



export default ItemList;
