const initialState = {
  transferMarket: {
    players: [],
    money: 1000000000,
    loading: true,
    error: false
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
