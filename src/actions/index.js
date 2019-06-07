const fetchRequest = (dispatch, fmapiService) => {
  fmapiService.getAllPlayers()
    .then((res) => {
      setTimeout(() => {
        dispatch(playersRequest(res));
      }, 1);
    })
    .catch((err) => {
      console.log(err);
    });
};

const playersRequest = (items) => {
  return {
    type: 'FETCH_PLAYERS_REQUEST',
    payload: items
  };
};

const sortPlayers = (criterion, sortValue) => {
  return {
    type: 'SORT_PLAYERS',
    payload: {
      criterion: criterion,
      sortValue: sortValue
    }
  };
};

const toggleModal = (value) => {
  return {
    type: 'TOGGLE_MODAL',
    payload: value
  };
};

const preOrderPlayer = (dispatch, id, value) => {
  dispatch(toggleModal(value));
  return {
    type: 'PRE_ORDER_PLAYER',
    payload: id
  };
};

const buyPlayer = (dispatch, player, money) => {
  if(player.cost > money) {
    return {
      type: 'BUY_PLAYER',
      payload: {
        player: player,
        purchaseError: player.cost > money
      }
    };
  }
  dispatch(toggleModal(false));
  return {
    type: 'BUY_PLAYER',
    payload: {
      player: player,
      purchaseError: player.cost <= money
    }
  };
};


export {
  fetchRequest,
  sortPlayers,
  buyPlayer,
  preOrderPlayer,
  toggleModal
};
