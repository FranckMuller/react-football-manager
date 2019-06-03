import React, { Component } from 'react';
import withFmapiService from '../hoc/with-fmapi-service';
import { connect } from 'react-redux';
import { fetchRequest, clearList, preOrderPlayer } from '../../actions';

import TransferMarket from './transfer-market';
import Spinner from '../spinner';


class TransferMarketContainer extends Component {

  componentWillMount() {
    const { fmapiService, getAllPlayers, items } = this.props;
    if(!items.length) {
      getAllPlayers(fmapiService);
    }; 
  };

  componentWillUnmount() {
    this.props.onClearedList();
  };

  render() {
    const { isLoading, ...marketProps } = this.props;

    if(isLoading) return <Spinner />

    return (
      <div className="container-fluid transfer-market-container">
        <TransferMarket {...marketProps} />
      </div>
    );
  };

};

const mapStateToProps = ({ transferMarket: { displayedPlayers, loading, selectedPlayer } }) => {
  return {
    items: displayedPlayers,
    isLoading: loading,
    selectedPlayer: selectedPlayer
  };
};

const mapDispatchToProps = (dispatch, { fmapiService }) => {
  return {
    getAllPlayers: () => fetchRequest(dispatch, fmapiService),
    onClearedList: () => dispatch(clearList()),
    preOrderPlayer: (id) => dispatch(preOrderPlayer(dispatch, id))
  };
};

export default withFmapiService(connect(mapStateToProps, mapDispatchToProps)(TransferMarketContainer));
