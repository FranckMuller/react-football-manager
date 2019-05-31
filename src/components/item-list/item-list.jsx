import React from 'react';

import ItemDetails from '../item-details';

import './item-list.scss';

const ItemList = ({ items, ...props }) => {
  return (
    <ul className="item-list list-unstyled d-flex flex-wrap">
      {
        items.map((item) => {
          const { id, ...itemProps } = item;
          return (
            <li key={id}>
              <ItemDetails {...props} {...itemProps} />
            </li>
            );
          })
      }
    </ul>
  );
};



export default ItemList;
