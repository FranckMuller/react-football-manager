const sortingItems = (state, criterion, sortValue) => {
  let items = [];

  if (state.transferMarket.sortingValue === sortValue) return state.transferMarket;

  if(sortValue === 'my-command') {
    items = state.transferMarket.allPlayers.filter(({ purchased }) => purchased === true);
    return {
      ...state.transferMarket,
        sortingValue: sortValue,
        displayedPlayers: items
    };
  }

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

    case 'BUY_PLAYER':
      let purchasedPlayer = action.payload.player;
      let isPurchaseError = action.payload.purchaseError;
      const oldDisplayedItemIdx = state.transferMarket.displayedPlayers.findIndex(({ id }) => id === purchasedPlayer.id);
      const oldItemIdx = state.transferMarket.allPlayers.findIndex(({ id }) => id === purchasedPlayer.id);
      if(purchasedPlayer.cost > state.transferMarket.money) {
        return {
          ...state.transferMarket,
          purchaseError: isPurchaseError
        }
      }
      purchasedPlayer = {
        ...purchasedPlayer,
        purchased: true,
        cost: purchasedPlayer.cost - (purchasedPlayer.cost / 5)
      }
      return {
        ...state.transferMarket,
        selectedPlayer: null,
        money: state.transferMarket.money - purchasedPlayer.cost,
        purchaseError: isPurchaseError,
        allPlayers: [
          ...state.transferMarket.allPlayers.slice(0, oldItemIdx),
          ...state.transferMarket.allPlayers.slice(oldItemIdx + 1),
          purchasedPlayer
        ],
        displayedPlayers: [
          ...state.transferMarket.displayedPlayers.slice(0, oldDisplayedItemIdx),
          ...state.transferMarket.displayedPlayers.slice(oldDisplayedItemIdx + 1),
          purchasedPlayer
        ]
      }
    
     default: 
      return state.transferMarket 
  };
};

export default updateTransferMarket;