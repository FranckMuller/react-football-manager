import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyClubForm from '../my-club-form';
import Placeholder from '../placeholder';

import './my-club.scss';

const ViewMyClub = ({ clubInfo }) => {
  return (
    <div className="view-my-club">
      <h3 className="title text-center d-flex align-items-center justify-content-center">FC {clubInfo.club.name} <span><img src={clubInfo.club.image} alt="logo"/></span></h3>
      <div className="owner">
        <div className="photo">
          <img src={clubInfo.owner.image} alt=""/>
        </div>
        <div className="name">{clubInfo.owner.name}</div>
      </div>
    </div>
  );
};

class MyClub extends Component {

  renderView = () => {
    const { clubInfo } = this.props;
    if(this.props.clubInfo !== null) {
      return <ViewMyClub clubInfo={clubInfo} />
    }
    return <Placeholder title={<span><Link to="/my-club/configuration">Start</Link> club configuration</span>} />
  };

  render() {
    console.log(this.props);
    return (
      <div className="my-club container-fluid">
        <Route exact path="/my-club" render={this.renderView} />
        <Route exact path="/my-club/configuration" component={MyClubForm} />
      </div>
    );
  };

};

export default MyClub;
