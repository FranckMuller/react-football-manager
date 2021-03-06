import React from 'react';

import './item-list.scss';

const ItemList = ({ items, renderBtns = null, children }) => {

  return (
    <ul className="item-list d-flex flex-wrap">
      {
        items.map((item) => {
          let btns = null;
          if (renderBtns) btns = renderBtns(item)
          return (
            <li key={item.id}>
              <div className="d-flex li-content flex-column justify-content-between">
                {
                  React.cloneElement(children, { item }) 
                }
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
