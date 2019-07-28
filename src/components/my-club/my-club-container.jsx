import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyClub from './my-club';


class MyClubContainer extends Component {
  render() {
    return (
        <MyClub myClub={this.props.myClub} />
    );
  };
};

const mapStateToProps = ({ myClub }) => {
  return {
    myClub: myClub
  };
};

export default connect(mapStateToProps)(MyClubContainer);
