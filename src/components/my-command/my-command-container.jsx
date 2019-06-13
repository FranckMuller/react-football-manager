import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myCommandRequest } from '../../actions';

import MyCommand from './my-command';

class MyCommandContainer extends Component {

  componentWillMount() {
    const { onGetItems } = this.props;
    onGetItems();
  };

  render() {

    return (
      <MyCommand {...this.props} />
    );
  };
};

const mapStateToProps = ({ myCommand: { players }}) => {
  return {
    items: players
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetItems: () => dispatch(myCommandRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCommandContainer);
