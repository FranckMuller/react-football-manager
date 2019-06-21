import { toggleModal } from './modal-window';
import { clearError } from './base';

const myTeamRequest = () => {
  return {
    type: 'MY_TEAM_REQUEST'
  };
};

const selectedPlayerForConfiguration = (dispatch, id) => {
  dispatch(toggleModal(true));
  return {
    type: 'SELECTED_PLAYER_FOR_CONFIGURATION',
    payload: id
  };
};

const configurePlayer = (data, itemId, dispatch, items) => {

  if(items.find(({ number, id }) => number === data.number && id !== itemId) !== undefined) {
    setTimeout(() => {
      dispatch(clearError());
    }, 2000)
    return {
      type: 'CONFIGURE_PLAYER',
      payload: {
        id: itemId,
        data: data,
        error: true
      }
    };
  };

  dispatch(toggleModal(false));
  return {
    type: 'CONFIGURE_PLAYER',
    payload: {
      id: itemId,
      data: data,
      error: false
    }
  };
};

export {
  myTeamRequest,
  selectedPlayerForConfiguration,
  configurePlayer
};
