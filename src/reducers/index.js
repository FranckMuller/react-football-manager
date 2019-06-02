const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 10000000000,
    loading: true,
    error: false,
    selectedPlayer: {},
    sortingValue: 'all',
    sortingBtns: [
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
      }
    ]
  },
  isShowModal: false
}

const updateItems = (state, criterion, sortValue) => {
  let items = [];

  if (state.transferMarket.sortingValue === sortValue) return state;

  if (criterion === 'position') {
    items = state.transferMarket.allPlayers.filter(({ position }) => position === sortValue);
  } else if (criterion === 'cost') {
    items = state.transferMarket.displayedPlayers.slice().sort((a, b) => {
      return a.cost - b.cost
    });
  } else {
    items = state.transferMarket.displayedPlayers.slice().sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  if (criterion !== 'position') {
    return {
      ...state,
      transferMarket: {
        ...state.transferMarket,
        sortingValue: sortValue,
        displayedPlayers: items
      }
    };
  }

  if (sortValue === 'all') {
    return {
      ...state,
      transferMarket: {
        ...state.transferMarket,
        sortingValue: sortValue,
        displayedPlayers: state.transferMarket.allPlayers
      }
    };
  }

  if (state.transferMarket.sortingValue === criterion) {
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
};



const reducer = (state = initialState, action) => {
  switch (action.type) {

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
      return updateItems(state, action.payload.criterion, action.payload.sortValue);

    // case 'BUY_PLAYER':
    //   const playerIdx = state.transferMarket.allPlayers.findIndex(({ id }) => id === action.payload);
    //   const displayedPlayerIdx = state.transferMarket.displayedPlayers.findIndex(({ id }) => id === action.payload);
    //   let newItem = state.transferMarket.allPlayers[playerIdx];
    //   let displayedNewItem = state.transferMarket.displayedPlayers[displayedPlayerIdx];
    //   newItem = {
    //     ...newItem,
    //     bought: true
    //   }
    //   displayedNewItem = {
    //     ...displayedNewItem,
    //     bought: true
    //   }
    //   return {
    //     ...state,
    //     transferMarket: {
    //       ...state.transferMarket,
    //       allPlayers: [
    //         ...state.transferMarket.allPlayers.slice(0, playerIdx),
    //         newItem,
    //         ...state.transferMarket.allPlayers.slice(playerIdx + 1),
    //       ],
    //       displayedPlayers: [
    //         ...state.transferMarket.displayedPlayers.slice(0, displayedPlayerIdx),
    //         displayedNewItem,
    //         ...state.transferMarket.displayedPlayers.slice(displayedPlayerIdx + 1),
    //       ]
    //     }
    //   }

    case 'TOGGLE_MODAL':

      if(!action.payload.id) {
        return {
          ...state,
          isShowModal: action.payload.isShowModal
        }
      }

      const selectedPlayer = state.transferMarket.displayedPlayers.find(({ id }) => id === action.payload.id);
      return {
        ...state,
        isShowModal: action.payload.isShowModal,
        transferMarket: {
          ...state.transferMarket,
          selectedPlayer: selectedPlayer
        }
      }

    default:
      return state
  };
};

export default reducer;
