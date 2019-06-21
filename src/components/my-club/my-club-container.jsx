import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyClub from './my-club';


class MyClubContainer extends Component {
  render() {
    return (
        <MyClub clubInfo={this.props.clubInfo} />
    );
  };
};

const mapStateToProps = ({ myClub: { clubInfo } }) => {
  return {
    clubInfo: clubInfo
  };
};

export default connect(mapStateToProps)(MyClubContainer);
