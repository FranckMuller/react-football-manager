import React, { Component } from 'react';
import withFmapiService from '../hoc/with-fmapi-service';
import { connect } from 'react-redux';
import { fetchRequest, showConfirmationModal, playerSaleOrPurchase } from '../../actions';

import TransferMarket from './transfer-market';
import Spinner from '../spinner';


class TransferMarketContainer extends Component {

  componentWillMount() {
    const { fmapiService, getAllPlayers, items } = this.props;
    if(!items.length) {
      getAllPlayers(fmapiService);
    }; 
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

const mapStateToProps = ({ transferMarket: { displayedPlayers, loading, selectedPlayer, purchaseError, money }}) => {
  return {
    items: displayedPlayers,
    isLoading: loading,
    selectedPlayer: selectedPlayer,
    purchaseError: purchaseError,
    money: money
  };
};

const mapDispatchToProps = (dispatch, { fmapiService }) => {
  return {
    getAllPlayers: () => fetchRequest(dispatch, fmapiService),
    onShowConfirmationModal: (id) => dispatch(showConfirmationModal(dispatch, id)),
    onPlayerSaleOrPurchase: (player, money) => dispatch(playerSaleOrPurchase(dispatch, player, money)),
  };
};

export default withFmapiService(connect(mapStateToProps, mapDispatchToProps)(TransferMarketContainer));
