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

const mapStateToProps = ({ myClub: { hasData, club, owner, trainer, stadium } }) => {
  return {
    hasData,
    club,
    owner,
    trainer,
    stadium
  };
};

export default connect(mapStateToProps)(MyClubContainer);
