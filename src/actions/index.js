const fetchRequest = (dispatch, fmapiService) => {
  fmapiService.getAllPlayers()
    .then((res) => {
      dispatch(playersRequest(res));
    })
};

const playersRequest = (items) => {
  return {
    type: 'FETCH_PLAYERS_REQUEST',
    payload: items
  }
}

export {
  fetchRequest
};
