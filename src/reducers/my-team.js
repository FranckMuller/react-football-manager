import lodash from 'lodash';

const updateItemsAfterRequest = (state) => {
  let items = [];
  state.transferMarket.allPlayers.forEach((marketEl) => {
    if (marketEl.purchased && state.myTeam.players.findIndex(({ id }) => id === marketEl.id) === -1) {
      items.push(marketEl)
    };
  });
  const newItems = items.map((item) => {
    return lodash.pick(item, ['name', 'image', 'rating', 'id'])
  });
  return {
    ...state.myTeam,
    players: [
      ...state.myTeam.players,
      ...newItems
    ]
  };
};

const updateItemAfterConfiguration = (item, data) => {
  const { position, number, captain } = data;
  return {
    ...item,
    position,
    number,
    captain
  }
};

const updateItemsAfterConfiguration = (state, itemId, data, error) => {
  const item = state.myTeam.players.find(({ id }) => id === itemId);
  const itemIdx = state.myTeam.players.findIndex(({ id }) => id === itemId);
  
  if(error === true) {
    return {
      ...state.myTeam,
      error: true
    }
  }

  const newItem = updateItemAfterConfiguration(item, data);

  if (data.captain && state.myTeam.players.findIndex(({ captain }) => captain === true) !== -1) {
    const oldCaptainIdx = state.myTeam.players.findIndex(({ captain }) => captain === true);
    state.myTeam.players[oldCaptainIdx] = {
      ...state.myTeam.players[oldCaptainIdx],
      captain: false
    }
  }

  return {
    ...state.myTeam,
    players: [
      ...state.myTeam.players.slice(0, itemIdx),
      newItem,
      ...state.myTeam.players.slice(itemIdx + 1)
    ]
  };
}

const updateMyTeam = (state, action) => {
  switch (action.type) {
    case 'MY_TEAM_REQUEST':
      return updateItemsAfterRequest(state);

    case 'CONFIGURE_PLAYER':
      return updateItemsAfterConfiguration(state, action.payload.id, action.payload.data, action.payload.error);

    case 'SELECTED_PLAYER_FOR_CONFIGURATION':
      const selectedPlayer = state.myTeam.players.find(({ id }) => id === action.payload);
      return {
        ...state.myTeam,
        selectedPlayer: selectedPlayer
      }

    case 'PLAYER_SALE':
      const idx = state.myTeam.players.findIndex(({ id }) => id === action.payload);
      return {
        ...state.myTeam,
        players: [
          ...state.myTeam.players.slice(0, idx),
          ...state.myTeam.players.slice(idx + 1)
        ]
      }

    case 'CLEAR_ERROR':
      return {
        ...state.myTeam,
        error: false
      }  

    default:
      return state.myTeam;
  }
};

export default updateMyTeam;
