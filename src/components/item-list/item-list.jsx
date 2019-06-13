import React from 'react';

import './item-list.scss';

const ItemList = ({ items, renderBtns = null, warningComponent = null, children }) => {

  if(items.length === 0) {
    return (
      warningComponent
    );
  }; 

  return (
    <ul className="item-list d-flex flex-wrap">
      {
        items.map((item) => {
          let btns = null;
          if (renderBtns) btns = renderBtns(item)
          return (
            <li key={item.id}>
              <div className="d-flex li-content flex-column">
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
