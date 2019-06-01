import React from 'react';
import { connect } from 'react-redux';
import { sortPlayers } from '../../actions';

import './market-panel.scss';

const TopMarketPanel = ({ items, onSorted, sortingValue }) => {

  return (
    <ul className="nav justify-content-between top-panel">
      {
        items.map(({ label, sort, criterion }) => {

          let classes = "flex-shrink-1 flex-grow-1";
          if(sort === sortingValue) classes = classes + ' active';

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

const LeftMarketPanel = ({ items, onSorted }) => {

  return (
    <ul className="nav flex-column left-panel">
      {
        items.map(({ criterion, sort }) => {
          
          let classes = "flex-shrink-1 flex-grow-1";
          let icon = '';
          
          if(sort === 'rating') icon = 'fa fa-star-o'
          if(sort === 'cost') icon = 'fa fa-money'

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



const MarketPanel = ({ sortingValue, onSorted, sortingBtns }) => {
  const positionBtns = sortingBtns.filter(({ criterion }) => criterion === 'position');
  const otherBtns = sortingBtns.filter(({ criterion }) => criterion !== 'position' );
  return (
    <div className="market-panel">
      <TopMarketPanel items={positionBtns} sortingValue={sortingValue} onSorted={onSorted} />
      <LeftMarketPanel items={otherBtns} sortingValue={sortingValue} onSorted={onSorted} />
    </div>
  );
};

const mapStateToProps = ({ transferMarket: { sortingBtns, sortingValue } }) => {
  return {
    sortingBtns: sortingBtns,
    sortingValue: sortingValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSorted: (value, id) => dispatch(sortPlayers(value, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketPanel);
