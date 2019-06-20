import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyClub from './my-club';
import Placeholder from '../placeholder';

class MyClubContainer extends Component {
  
  render() {
    if(this.props.myClub === null) {
      return (<Placeholder 
        title={<span><Link to="/my-club/configuration">Start</Link> club configuration</span>} />)
    };
    return (
      <MyClub {...this.props} />
    );
  };
};

const mapStateToProps = ({ myClub }) => {
  return {
    myClub: myClub
  };
};

export default connect(mapStateToProps)(MyClubContainer);
