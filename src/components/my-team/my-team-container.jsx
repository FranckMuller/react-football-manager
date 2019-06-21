import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { myTeamRequest, selectedPlayerForConfiguration, configurePlayer } from '../../actions';

import Placeholder from '../placeholder';

import MyTeam from './my-team';

class MyTeamContainer extends Component {

  componentWillMount() {
    const { onGetItems } = this.props;
    onGetItems();
  };

  render() {
    if(this.props.items.length < 1) {
      return (
        <Placeholder 
          title={<span>You do not have any purchased players, go to the <Link to="/transfer-market">transfer market</Link> to buy them</span>} />
      );
    };
    return (
      <MyTeam {...this.props} />
    );
  };
};

const mapStateToProps = ({ myTeam: { players, selectedPlayer, error }}) => {
  return {
    items: players,
    seletedItem: selectedPlayer,
    error: error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetItems: () => dispatch(myTeamRequest()),
    onShowConfigureModal: (id) => dispatch(selectedPlayerForConfiguration(dispatch, id)),
    onPlayerConfigured: (data, id, items) => dispatch(configurePlayer(data, id, dispatch, items))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeamContainer);
