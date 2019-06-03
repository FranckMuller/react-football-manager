const fetchRequest = (dispatch, fmapiService) => {
  fmapiService.getAllPlayers()
    .then((res) => {
      setTimeout(() => {
        dispatch(playersRequest(res));
      }, 1);
    })
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

const clearList = () => {
  return {
    type: 'CLEAR_LIST'
  };
};

const buyPlayer = (id) => {
  return {
    type: 'BUY_PLAYER',
    payload: id
  }
}

const showModal = () => {
  return {
    type: 'SHOW_MODAL'
  };
};

const preOrderPlayer = (dispatch, id) => {
  dispatch(showModal());
  return {
    type: 'PRE_ORDER_PLAYER',
    payload: id
  }
}

export {
  fetchRequest,
  sortPlayers,
  clearList,
  buyPlayer,
  preOrderPlayer
};
