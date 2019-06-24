import updateTransferMarket from './transfer-market';
import updateModalWindow from './modal-window';
import updateMyTeam from './my-team';
import updateMyClub from './my-club';

const initialState = {
  transferMarket: {
    allPlayers: [],
    displayedPlayers: [],
    money: 1500000000,
    loading: true,
    selectedPlayer: null,
    sortingValue: 'all',
    purchaseError: false
  },
  modalWindow: {
    isShowModal: false, 
  },
  myTeam: {
    players: [],
    selectedPlayer: null,
    error: false
  },
  myClub: {
    clubInfo: {
      club: {label: "club", image: "http://localhost:3000/barselona.png", name: "Barselona"},
      owner: {label: "owner", image: "http://localhost:3000/messi-min.png", name: "Dimasta"},
      stadium: {label: "stadium", image: null, name: ""},
      trainer: {label: "trainer", image: null, name: ""}
    }
  }
};

const reducer = (state = initialState, action) => {
  return {
    modalWindow: updateModalWindow(state, action),
    transferMarket: updateTransferMarket(state, action),
    myTeam: updateMyTeam(state, action),
    myClub: updateMyClub(state, action)
  }
};

export default reducer;
