import React from 'react';

import ItemDetails from '../item-details';

import './item-list.scss';

const ItemList = ({ items, ...props }) => {
  return (
    <ul className="item-list list-unstyled d-flex flex-wrap">
      {
        items.map(({ id, name, image, position }) => {
          return (
            <li key={id}>
              <ItemDetails {...props} name={name} photo={image} position={position} />
            </li>
            );
          })
      }
    </ul>
  );
};



export default ItemList;
