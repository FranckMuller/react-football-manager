import updateTransferMarket from './transfer-market';
import updateModalWindow from './modal-window';
import updateMyCommand from './my-command';

const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 1000000000,
    loading: true,
    selectedPlayer: null,
    sortingValue: 'all',
    purchaseError: false
  },
  modalWindow: {
    isShowModal: false, 
  },
  myCommand: {
    players: []
  },
};

const reducer = (state = initialState, action) => {
  return {
    modalWindow: updateModalWindow(state, action),
    transferMarket: updateTransferMarket(state, action),
    myCommand: updateMyCommand(state, action)
  }
};

export default reducer;
