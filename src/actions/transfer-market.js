import { toggleModal } from './modal-window';
import { clearError } from './base';

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

const playerSaleOrPurchase = (dispatch, player, money) => {

  if(player.purchased) {
    dispatch(updateMyTeamAfterSale(player.id))
  }

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

const selectedPlayerForSaleOrPurchase = (dispatch, id) => {
  dispatch(toggleModal(true));
  return {
    type: 'SELECTED_PLAYER_FOR_SALE_OR_PURCHASE',
    payload: id
  };
};

const updateMyTeamAfterSale = (id) => {
  return {
    type: 'PLAYER_SALE',
    payload: id
  }
}

export {
  fetchRequest,
  sortPlayers,
  playerSaleOrPurchase,
  selectedPlayerForSaleOrPurchase
}
