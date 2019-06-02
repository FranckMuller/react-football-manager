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

const toggleModal = (value, id) => {
  console.log(value, id)
  return {
    type: 'TOGGLE_MODAL',
    payload: {
      isShowModal: value,
      id: id
    }
  };
};

export {
  fetchRequest,
  sortPlayers,
  clearList,
  buyPlayer,
  toggleModal
};
