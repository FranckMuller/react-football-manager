import React, { Component } from 'react';
import withFmapiService from '../hoc/with-fmapi-service';
import { connect } from 'react-redux';
import { fetchRequest, clearList } from '../../actions';

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
    const { items, isLoading } = this.props;

    if(isLoading) return <Spinner />

    return (
      <div className="container transfer-market-container">
        <TransferMarket items={items} />
      </div>
    );
  };

};

const mapStateToProps = ({ transferMarket: { displayedPlayers, loading } }) => {
  return {
    items: displayedPlayers,
    isLoading: loading
  };
};

const mapDispatchToProps = (dispatch, { fmapiService }) => {
  return {
    getAllPlayers: () => fetchRequest(dispatch, fmapiService),
    onClearedList: () => dispatch(clearList())
  };
};

export default withFmapiService(connect(mapStateToProps, mapDispatchToProps)(TransferMarketContainer));