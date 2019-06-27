import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyClubForm from '../my-club-form';
import Placeholder from '../placeholder';

import 'moment-timezone';

import './my-club.scss';

const ViewMyClub = ({ club, owner, trainer, stadium }) => {

  console.log(owner.ownerBirthYear)

  return (
    <div className="view-my-club">
      <h3 className="title text-center d-flex align-items-center justify-content-center">FC {club.clubName} <span><img src={club.clubLogo} alt="logo" /></span></h3>
      <div className="employees d-flex">
        <div className="employee-box d-flex">
          <div className="employee owner d-flex flex-column">
            <div className="position text-center">Owner</div>
            <div className="description flex-shrink-1 flex-grow-1">
              <div className="photo">
                <img src={owner.ownerPhoto} alt="owner" />
              </div>
              <div className="name d-flex justify-content-between">
                <span className="label">name:</span>
                <span>{owner.ownerName}</span>
              </div>
              <div className="age d-flex justify-content-between">
                <span className="label">age:</span>
                <span>{new Date().getFullYear() - owner.ownerBirthYear.getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="employee-box d-flex">
          <div className="employee trainer d-flex flex-column">
            <div className="position text-center">Trainer</div>
            <div className="description flex-shrink-1 flex-grow-1">
              <div className="photo">
                <img src={trainer.trainerPhoto} alt="trainer" />
              </div>
              <div className="name d-flex justify-content-between">
                <span className="label">name:</span>
                <span>{trainer.trainerName}</span>
              </div>
              <div className="age d-flex justify-content-between">
                <span className="label">age:</span>
                <span>{new Date().getFullYear() - trainer.trainerBirthYear.getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

class MyClub extends Component {

  renderView = () => {
    const { hasData, ...viewProps } = this.props;
    if (hasData) {
      return <ViewMyClub {...viewProps} />
    }
    return <Placeholder title={<span><Link to="/my-club/configuration">Start</Link> club configuration</span>} />
  };

  render() {
    return (
      <div className="my-club container-fluid">
        <Route exact path="/my-club" render={this.renderView} />
        <Route exact path="/my-club/configuration" component={MyClubForm} />
      </div>
    );
  };

};

export default MyClub;
