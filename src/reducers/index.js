const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 10000000000,
    loading: true,
    error: false,
    selectedPlayer: null,
    sortingValue: 'all'
  },
  modalWindow: {
    isShowModal: false
  }
}

const updateModalWindow = (state, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return {
        isShowModal: action.payload
      }
    
    default:  
      return state.modalWindow
  }
}

const sortingItems = (state, criterion, sortValue) => {
  let items = [];

  if (state.transferMarket.sortingValue === sortValue) return state.transferMarket;

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
      ...state.transferMarket,
        sortingValue: sortValue,
        displayedPlayers: items
    };
  }

  if (sortValue === 'all') {
    return {
      ...state.transferMarket,
      sortingValue: sortValue,
      displayedPlayers: state.transferMarket.allPlayers
    };
  }

  if (state.transferMarket.sortingValue === criterion) {
    return {
      ...state.transferMarket
    }
  }

  return {
    ...state.transferMarket,
      sortingValue: sortValue,
      displayedPlayers: items
  };
};

const updateTransferMarket = (state, action) => {
  switch(action.type) {
    case 'FETCH_PLAYERS_REQUEST':
      return {
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
      };

    case 'SORT_PLAYERS':
      return sortingItems(state, action.payload.criterion, action.payload.sortValue);

    case 'PRE_ORDER_PLAYER':
      const selectedPlayer = state.transferMarket.allPlayers.find(({ id }) => id === action.payload);
      return {
        ...state.transferMarket,
        selectedPlayer: selectedPlayer
      };
    
     default: 
      return state.transferMarket 
  };
};



const reducer = (state = initialState, action) => {
  return {
    modalWindow: updateModalWindow(state, action),
    transferMarket: updateTransferMarket(state, action)
  }
};

export default reducer;
