const updateMyClub = (state, action) => {
  switch(action.type) {
    case 'UPDATE_MY_CLUB':
      const updatedClub = {};
      action.payload.map((el) => {
        updatedClub[el.label] = el;
      });
      return {
        ...state.myClub,
        clubInfo: updatedClub
      }

    default: return state.myClub;  
  };
};

export default updateMyClub;