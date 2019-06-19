const updateItemsAfterRequest = (state, items) => {
  return {
    ...state.transferMarket,
    loading: false,
    allPlayers: [
      ...state.transferMarket.allPlayers,
      ...items
    ],
    displayedPlayers: [
      ...state.transferMarket.displayedPlayers,
      ...items
    ]
  };
};

const sortingItems = (state, criterion, sortValue) => {
  let items = [];

  if (state.transferMarket.sortingValue === sortValue) return state.transferMarket;

  switch (criterion) {
    case 'purchased':
      items = state.transferMarket.allPlayers.filter(({ purchased }) => purchased === true);
      break;

    case 'position':
      items = state.transferMarket.allPlayers.filter(({ position }) => position === sortValue);
      break;

    case 'cost':
      items = state.transferMarket.displayedPlayers.slice().sort((a, b) => {
        return a.cost - b.cost
      });
      break;

    case 'rating':
      items = state.transferMarket.displayedPlayers.slice().sort((a, b) => {
        return b.rating - a.rating
      });
      break;

    case 'all':
      items = state.transferMarket.allPlayers;
      break

    default:
      return state.transferMarket;
  }

  return {
    ...state.transferMarket,
    displayedPlayers: items,
    sortingValue: sortValue
  }
};

const updateItemAfterSaleOrPurchase = (item) => {
  if (item.purchased) {
    return {
      ...item,
      purchased: false
    }
  } else {
    return {
      ...item,
      purchased: true
    }
  };
};

const updateItemsAfterSaleOrPurchase = (state, item, error) => {
  if (error) {
    return {
      ...state.transferMarket,
      purchaseError: error
    };
  };

  const itemIdx = state.transferMarket.allPlayers.findIndex(({ id }) => id === item.id);
  const displayedItemIdx = state.transferMarket.displayedPlayers.findIndex(({ id }) => id === item.id);
  let displayedPlayers = []

  if (state.transferMarket.sortingValue === 'purchased') {
    displayedPlayers = [
      ...state.transferMarket.displayedPlayers.slice(0, displayedItemIdx),
      ...state.transferMarket.displayedPlayers.slice(displayedItemIdx + 1),
    ];
  } else {
    displayedPlayers = [
      ...state.transferMarket.displayedPlayers.slice(0, displayedItemIdx),
      ...state.transferMarket.displayedPlayers.slice(displayedItemIdx + 1),
      updateItemAfterSaleOrPurchase(item)
    ]
  };

  return {
    ...state.transferMarket,
    displayedPlayers: displayedPlayers,
    allPlayers: [
      ...state.transferMarket.allPlayers.slice(0, itemIdx),
      ...state.transferMarket.allPlayers.slice(itemIdx + 1),
      updateItemAfterSaleOrPurchase(item),
    ],
    money: item.purchased ? state.transferMarket.money + item.cost - (item.cost / 5) : state.transferMarket.money - item.cost
  };

};

const updateTransferMarket = (state, action) => {
  switch (action.type) {
    case 'FETCH_PLAYERS_REQUEST':
      return updateItemsAfterRequest(state, action.payload);

    case 'SORT_PLAYERS':
      return sortingItems(state, action.payload.criterion, action.payload.sortValue);

    case 'PLAYER_SALE_OR_PURCHASE':
      return updateItemsAfterSaleOrPurchase(state, action.payload.player, action.payload.purchaseError);

    case 'SELECTED_PLAYER_FOR_SALE_OR_PURCHASE':
      let selectedPlayer = state.transferMarket.allPlayers.find(({ id }) => id === action.payload);
      return {
        ...state.transferMarket,
        selectedPlayer: selectedPlayer
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
