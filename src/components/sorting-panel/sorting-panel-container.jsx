import React from 'react';
import { connect } from 'react-redux';
import { sortPlayers } from '../../actions';

import { TopSortingPanel, LeftSortingPanel } from './sorting-panel';

const SortingPanelContainer = ({ sortingValue, onSorted, count }) => {

  const sortingBtns = [
    {
      label: 'All players',
      sort: 'all',
      criterion: 'position'
    },
    {
      label: 'Attack',
      sort: 'attack',
      criterion: 'position'
    },
    {
      label: 'Half Back',
      sort: 'half-back',
      criterion: 'position'
    },
    {
      label: 'Defender',
      sort: 'defender',
      criterion: 'position'
    },
    {
      label: 'Goalkepeer',
      sort: 'goalkeeper',
      criterion: 'position'
    },
    {
      label: 'Cost',
      sort: 'cost',
      criterion: 'cost'
    },
    {
      label: 'Rating',
      sort: 'rating',
      criterion: 'rating'
    },
    {
      label: `My Command (${count})`,
      sort: 'my-command',
      criterion: 'my-command'
    }
  ];
    

  const positionBtns = sortingBtns.filter(({ criterion }) => criterion === 'position' || criterion === 'my-command');
  const otherBtns = sortingBtns.filter(({ criterion }) => criterion !== 'position' && criterion !== 'my-command');
  
  return (
    <div className="market-panel">
      <TopSortingPanel items={positionBtns} sortingValue={sortingValue} onSorted={onSorted} />
      <LeftSortingPanel items={otherBtns} sortingValue={sortingValue} onSorted={onSorted} />
    </div>
  );
};

const mapStateToProps = ({ transferMarket: { sortingValue, allPlayers } }) => {
  return {
    sortingValue: sortingValue,
    count: allPlayers.filter(({ purchased }) => purchased === true).length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSorted: (sortValue, criterion) => dispatch(sortPlayers(sortValue, criterion))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingPanelContainer);