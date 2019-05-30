import React, { Component } from 'react';
import withFmapiService from '../hoc/with-fmapi-service';
import { connect } from 'react-redux';
import { fetchRequest } from '../../actions';

import TransferMarket from './transfer-market';


class TransferMarketContainer extends Component {

  componentWillMount() {
    const { fmapiService, getAllPlayers, items } = this.props;
    if(!items.length) {
      getAllPlayers(fmapiService);
    }; 
  };

  render() {
    const { items } = this.props;

    return (
      <TransferMarket items={items} />
    );
  };

};

const mapStateToProps = ({ transferMarket: { players } }) => {
  return {
    items: players
  }
}

const mapDispatchToProps = (dispatch, { fmapiService }) => {
  return {
    getAllPlayers: () => fetchRequest(dispatch, fmapiService)
  }
}

export default withFmapiService(connect(mapStateToProps, mapDispatchToProps)(TransferMarketContainer));