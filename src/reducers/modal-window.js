const updateModalWindow = (state, action) => {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return {
        isShowModal: action.payload
      };
    
    default:  
      return state.modalWindow
  };
};

export default updateModalWindow;