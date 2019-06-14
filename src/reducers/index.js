import updateTransferMarket from './transfer-market';
import updateModalWindow from './modal-window';
import updateMyTeam from './my-team';

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
  myTeam: {
    players: [
      {
        name: "Lionel Messi",
        id: "1",
        image: "http://localhost:3000/images/lionel-messi.jpg",
        rating: "98"
      }
    ],
    selectedPlayer: null
  },
};

const reducer = (state = initialState, action) => {
  return {
    modalWindow: updateModalWindow(state, action),
    transferMarket: updateTransferMarket(state, action),
    myTeam: updateMyTeam(state, action)
  }
};

export default reducer;
