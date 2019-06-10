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

    case 'SHOW_CONFIRMATION_MODAL':
      let selectedPlayer = state.transferMarket.allPlayers.find(({ id }) => id === action.payload);
      return {
        ...state.transferMarket,
        selectedPlayer: selectedPlayer
      };

    case 'PLAYER_SALE_OR_PURCHASE':
      let plyer = action.payload.player;
      let isPurchaseError = action.payload.purchaseError;
      const oldDisplayedItemIdx = state.transferMarket.displayedPlayers.findIndex(({ id }) => id === plyer.id);
      const oldItemIdx = state.transferMarket.allPlayers.findIndex(({ id }) => id === plyer.id);

      if(!plyer.purchased) {
        if(plyer.cost > state.transferMarket.money) {
          return {
            ...state.transferMarket,
            purchaseError: isPurchaseError
          }
        }
        plyer = {
          ...plyer,
          purchased: true,
        }
      } else {
        plyer = {
          ...plyer,
          purchased: false,
        }
      }

      return {
        ...state.transferMarket,
        selectedPlayer: null,
        money: plyer.purchased ? state.transferMarket.money - plyer.cost : state.transferMarket.money + (+plyer.cost - +plyer.cost / 5),
        purchaseError: isPurchaseError,
        allPlayers: [
          ...state.transferMarket.allPlayers.slice(0, oldItemIdx),
          ...state.transferMarket.allPlayers.slice(oldItemIdx + 1),
          plyer
        ],
        displayedPlayers: [
          ...state.transferMarket.displayedPlayers.slice(0, oldDisplayedItemIdx),
          ...state.transferMarket.displayedPlayers.slice(oldDisplayedItemIdx + 1),
          plyer
        ]
      };

    case 'CLEAR_ERROR': 
      return {
        ...state.transferMarket,
        purchaseError: false
      }
    
     default: 
      return state.transferMarket 
  };
};

export default updateTransferMarket;