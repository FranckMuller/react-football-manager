const updateMyClub = (state, action) => {
  switch(action.type) {
    case 'UPDATE_MY_CLUB':
      const { club, owner, trainer, stadium } = action.payload;
      return {
        ...state.myClub,
        club: club,
        owner: owner,
        trainer: trainer,
        stadium: stadium,
        hasData: true
      }

    default: return state.myClub;  
  };
};

export default updateMyClub;