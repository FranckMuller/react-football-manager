import React from 'react';
import { connect } from 'react-redux';
import { sortPlayers } from '../../actions';

import { TopSortingPanel, LeftSortingPanel } from './sorting-panel';

const SortingPanelContainer = ({ sortingValue, onSorted, sortingBtns }) => {
  const positionBtns = sortingBtns.filter(({ criterion }) => criterion === 'position');
  const otherBtns = sortingBtns.filter(({ criterion }) => criterion !== 'position' );
  
  return (
    <div className="market-panel">
      <TopSortingPanel items={positionBtns} sortingValue={sortingValue} onSorted={onSorted} />
      <LeftSortingPanel items={otherBtns} sortingValue={sortingValue} onSorted={onSorted} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SortingPanelContainer);