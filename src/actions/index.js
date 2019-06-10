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

const showConfirmationModal = (dispatch, id) => {
  dispatch(toggleModal(true));
  return {
    type: 'SHOW_CONFIRMATION_MODAL',
    payload: id
  };
};

const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

const playerSaleOrPurchase = (dispatch, player, money) => {
  if(!player.purchased && player.cost > money) {
    setTimeout(() => {
      dispatch(clearError());
    }, 2000)
    return {
      type: 'PLAYER_SALE_OR_PURCHASE',
      payload: {
        player: player,
        purchaseError: true
      }
    };
  };

  dispatch(toggleModal(false));
  return {
    type: 'PLAYER_SALE_OR_PURCHASE',
    payload: {
      player: player,
    }
  };
};


export {
  fetchRequest,
  sortPlayers,
  playerSaleOrPurchase,
  showConfirmationModal,
  toggleModal
};
