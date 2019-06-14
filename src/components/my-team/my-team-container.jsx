import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myTeamRequest, showConfigureModal, configurePlayer } from '../../actions';

import MyTeam from './my-team';

class MyTeamContainer extends Component {

  componentWillMount() {
    const { onGetItems } = this.props;
    onGetItems();
  };

  render() {

    return (
      <MyTeam {...this.props} />
    );
  };
};

const mapStateToProps = ({ myTeam: { players, selectedPlayer }}) => {
  return {
    items: players,
    seletedPlayer: selectedPlayer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetItems: () => dispatch(myTeamRequest()),
    onShowConfigureModal: (id) => dispatch(showConfigureModal(dispatch, id)),
    onPlayerConfigured: (data, id) => dispatch(configurePlayer(data, id, dispatch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeamContainer);
