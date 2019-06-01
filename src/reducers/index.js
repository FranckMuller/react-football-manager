const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 10000000000,
    loading: true,
    error: false,
    sortingValue: 'all',
    sortingBtns: [
      {
        id: 1,
        label: 'All players',
        sort: 'all',
        criterion: 'position'
      },
      {
        id: 2,
        label: 'Attack',
        sort: 'attack',
        criterion: 'position'
      },
      {
        id: 3,
        label: 'Half Back',
        sort: 'half-back',
        criterion: 'position'
      },
      {
        id: 3,
        label: 'Defender',
        sort: 'defender',
        criterion: 'position'
      },
      {
        id: 6,
        label: 'Goalkepeer',
        sort: 'goalkeeper',
        criterion: 'position'
      },
      {
        id: 7,
        label: 'Cost',
        sort: 'cost',
        criterion: 'cost'
      },
      {
        id: 8,
        label: 'Rating',
        sort: 'rating',
        criterion: 'rating'
      }
    ]
  }
}

const updateItems = (state, criterion, sortValue) => {
  let items = [];

  if(state.transferMarket.sortingValue === sortValue) {
    return state
  }
  
  if(criterion === 'position') {
    items = state.transferMarket.allPlayers.filter(({ position }) => position === sortValue);
  } else if(criterion === 'cost') {
    items = state.transferMarket.displayedPlayers.slice().sort((a, b) => {
      return a.cost - b.cost
    });
  } else {
    items = state.transferMarket.displayedPlayers.slice().sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  items.map((item) => {
    return {
      ...item,
      bought: false
    };
  });

  if(criterion !== 'position') {
    return {
      ...state,
      transferMarket: {
        ...state.transferMarket,
        displayedPlayers: items
      }
    };
  }

  if(sortValue === 'all') {
    return {
      ...state,
      transferMarket: {
        ...state.transferMarket,
        sortingValue: sortValue,
        displayedPlayers: state.transferMarket.allPlayers
      }
    };
  }

  if(state.transferMarket.sortingValue === criterion ) {
    return {
      ...state
    }
  }
  return {
    ...state,
    transferMarket: {
      ...state.transferMarket,
      sortingValue: sortValue,
      displayedPlayers: items
    }
  };


}



const reducer = (state = initialState, action) => {
  switch(action.type) {

    case 'CLEAR_LIST': 
      return {
        ...state,
        transferMarket: {
          ...state.transferMarket,
          allPlayers: [],
          displayedPlayers: [],
          loading: true
        }
      } 

    case 'FETCH_PLAYERS_REQUEST':
      return {
        ...state,
        transferMarket: {
          ...state.transferMarket,
          loading: false,
          allPlayers: [
            ...state.transferMarket.allPlayers,
            ...action.payload
          ],
          displayedPlayers: [
            ...state.transferMarket.displayedPlayers,
            ...action.payload
          ]
        }
      }

    case 'SORT_PLAYERS':
      return updateItems(state, action.payload.criterion,  action.payload.sortValue)
      
     
    default:
      return state  
  };
};

export default reducer;
