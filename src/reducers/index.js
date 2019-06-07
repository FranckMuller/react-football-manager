import updateTransferMarket from './transfer-market';
import updateModalWindow from './modal-window';

const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 10,
    loading: true,
    selectedPlayer: null,
    sortingValue: 'all',
    purchaseError: false
  },
  modalWindow: {
    isShowModal: false, 
  }
}

const reducer = (state = initialState, action) => {
  return {
    modalWindow: updateModalWindow(state, action),
    transferMarket: updateTransferMarket(state, action)
  }
};

export default reducer;
