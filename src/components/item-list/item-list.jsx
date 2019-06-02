import React from 'react';

import ItemDetails from '../item-details';

import './item-list.scss';

const ItemList = ({ items, ...props }) => {
  return (
    <ul className="item-list d-flex flex-wrap">
      {
        items.map((item) => {
          return (
            <li key={item.id}>
              <ItemDetails item={item} {...props} />
            </li>
            );
          })
      }
    </ul>
  );
};



export default ItemList;
