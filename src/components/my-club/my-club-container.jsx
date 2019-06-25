import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyClub from './my-club';


class MyClubContainer extends Component {
  render() {
    return (
        <MyClub {...this.props} />
    );
  };
};

const mapStateToProps = ({ myClub: { hasData } }) => {
  return {
    hasData: hasData
  };
};

export default connect(mapStateToProps)(MyClubContainer);
