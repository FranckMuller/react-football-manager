const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 1000000000,
    loading: true,
    error: false,
    sortingValue: 'all'
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
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
      let items = state.transferMarket.allPlayers.filter(({ position }) => position === action.payload);
      const players = items.map((item) => {
        return {
          ...item,
          bought: false
        };
      });

      if(action.payload === 'all') {
        return {
          ...state,
          transferMarket: {
            ...state.transferMarket,
            sortingValue: action.payload,
            displayedPlayers: state.transferMarket.allPlayers
          }
        };
      }

      if(state.transferMarket.sortingValue === action.payload ) {
        return {
          ...state
        }
      }

      return {
        ...state,
        transferMarket: {
          ...state.transferMarket,
          sortingValue: action.payload,
          displayedPlayers: players
        }
      };
     
    default:
      return state  
  };
};

export default reducer;
