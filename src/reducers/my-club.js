const updateMyClub = (state, action) => {
  switch(action.type) {
    case 'UPDATE_MY_CLUB':
      return {
        ...state.myClub
      }

    default: return state.myClub;  
  };
};

export default updateMyClub;