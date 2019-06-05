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

const buyPlayer = (id) => {
  return {
    type: 'BUY_PLAYER',
    payload: id
  }
}

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


export {
  fetchRequest,
  sortPlayers,
  buyPlayer,
  preOrderPlayer,
  toggleModal
};
