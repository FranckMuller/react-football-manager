import React from 'react';

import ItemDetails from '../item-details';

import './item-list.scss';

const ItemList = ({ items, renderBtns = null }) => {

  if(!items) {
    return (<div>empty list</div>)
  } 

  return (
    <ul className="item-list d-flex flex-wrap">
      {
        items.map((item) => {
          let btns = null;
          if (renderBtns) btns = renderBtns(item)
          return (
            <li key={item.id}>
              <div className="d-flex li-content flex-column">
                <ItemDetails item={item} />
                {btns}
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};


export default ItemList;
