const updateMyClub = (state, action) => {
  switch(action.type) {
    case 'UPDATE_MY_CLUB':
      return {
        ...state.myClub,
        hasData: true,
        clubInfo: {
          ...state.myClub.clubInfo,
          ...action.payload
        }
      }

    case 'CHANGE_STEP_COUNT': 
      return {
        ...state.myClub,
        form: {
          ...state.myClub.form,
          step: state.myClub.form.step + action.payload
        }
      };

    case 'ANIMATION_STEP': 
      return {
        ...state.myClub,
        form: {
          ...state.myClub.form,
          animationStep: action.payload
        }
      }

    default: return state.myClub
  };
};

export default updateMyClub;
