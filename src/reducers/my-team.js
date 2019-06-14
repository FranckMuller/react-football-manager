import lodash from 'lodash';

const updateMyTeam = (state, action) => {
  switch(action.type) {
    case 'MY_TEAM_REQUEST':
      let items = [];
      state.myTeam.players.forEach((teamEl) => {
        state.transferMarket.allPlayers.forEach(marketEl => {
          if(marketEl.purchased === true) {
            items.push(marketEl);
          };
        });
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

    case 'SHOW_CONFIGURE_MODAL':
      const selectedPlayer = state.myTeam.players.find(({ id }) => id === action.payload);
      return {
        ...state.myTeam,
        selectedPlayer: selectedPlayer
      }

    case 'CONFIGURE_PLAYER':
      let newItem = state.myTeam.players.find(({ id }) => id === action.payload.id);
      const itemIdx = state.myTeam.players.findIndex(({ id }) => id === action.payload.id);

      newItem = {
        ...newItem,
        captain: action.payload.data.captain,
        position: action.payload.data.position
      }  
      
      return {
        ...state.myTeam,
        players: [
          ...state.myTeam.players.slice(0, itemIdx),
          newItem,
          ...state.myTeam.players.slice(itemIdx + 1)
        ]
      }

    default: 
      return state.myTeam;  
  }
};

export default updateMyTeam;
