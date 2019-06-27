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
    club: {
      clubLogo: "http://localhost:3000/barselona.png",
      clubName: "Barselona"
    },
    owner: {
      ownerName: "Dima",
      ownerBirthYear: new Date(1992, 6, 3),
      ownerPhoto: "http://localhost:3000/owner.jpg",
    },
    trainer: {
      trainerName: "Guardiola",
      trainerBirthYear: new Date(1989, 6, 3),
      trainerPhoto: "http://localhost:3000/trainer.jpg",
    },
    stadium: {
      ownerName: "Camp Nou",
      ownerPhoto: "http://localhost:3000/stadium.jpeg",
    },
    hasData: true
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
