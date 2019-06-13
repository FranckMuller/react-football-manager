import lodash from 'lodash';

const updateMyCommand = (state, action) => {
  switch(action.type) {
    case 'MY_COMMAND_REQUEST':
      const items = state.transferMarket.allPlayers.filter(({ purchased }) => purchased === true);
      const newItems = items.map((item) => {
        return lodash.pick(item, ['image', 'rating', 'id'])
      });
      return {
        ...state.myCommand,
        players: newItems
      };

    default: 
      return state.myCommand;  
  }
};

export default updateMyCommand;
