const updateMyClub = (state, action) => {
  switch(action.type) {
    case 'UPDATE_MY_CLUB':
      let updatedClub = state.myClub.slice();
      action.payload.map((el) => {
        updatedClub = [
          ...updatedClub,
          el
        ]
      });
      return {
        ...state.myClub,
        ...updatedClub
      }

    default: return state.myClub;  
  };
};

export default updateMyClub;