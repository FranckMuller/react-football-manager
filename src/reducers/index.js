const initialState = {
  transferMarket: {
    players: [],
    loading: true
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_PLAYERS_REQUEST':
      return {
        ...state,
        transferMarket: {
          ...state.transferMarket,
          players: [
            ...state.transferMarket.players,
            ...action.payload
          ]
        }
      }
     
    default:
      return state  
  };
};

export default reducer;
