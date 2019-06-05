import React, { Component } from 'react';

import './sorting-panel.scss';

class TopSortingPanel extends Component {

  shouldComponentUpdate({ sortingValue }) {
    if(sortingValue === 'cost' || sortingValue === 'rating') {
      return false;
    };
    return true;
  };

  render() {
    const { items, onSorted, sortingValue } = this.props;

    return (
      <ul className="nav justify-content-between top-panel">
        {
          items.map(({ label, sort, criterion }) => {

            let classes = "flex-shrink-1 flex-grow-1";
            if (sort === sortingValue) classes = classes + ' active';

            return (
              <li key={sort} className={classes}>
                <button
                  className="btn btn-light"
                  onClick={() => onSorted(criterion, sort)} >
                  {label}
                </button>
              </li>
            );
          })
        }
      </ul>
    );
  };
};

const LeftSortingPanel = ({ items, onSorted, sortingValue }) => {

  return (
    <ul className="nav flex-column left-panel">
      {
        items.map(({ criterion, sort }) => {

          let classes = "flex-shrink-1 flex-grow-1";
          let icon = '';

          if (sort === sortingValue) classes = classes + ' active';
          if (sort === 'rating') icon = 'fa fa-star-o'
          if (sort === 'cost') icon = 'fa fa-money'

          return (
            <li key={sort} className={classes}>
              <button
                className="btn btn-light"
                onClick={() => onSorted(criterion, sort)} >
                <i className={icon}></i>
              </button>
            </li>
          );
        })
      }
    </ul>
  );
};

export {
  TopSortingPanel,
  LeftSortingPanel
}
