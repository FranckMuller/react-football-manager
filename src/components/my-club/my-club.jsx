import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyClubForm from '../my-club-form';
import Placeholder from '../placeholder';

import 'moment-timezone';

import './my-club.scss';

const ViewMyClub = ({ myClub }) => {

  return (
    <div className="view-my-club">
      <h3 className="title text-center d-flex align-items-center justify-content-center">FC {myClub.clubName} <span><img src={myClub.clubLogo} alt="logo" /></span></h3>
      <div className="employees d-flex justify-content-center">
        <div className="employee-box">
          <div className="employee owner d-flex flex-column">
            <div className="position text-center">Owner</div>
            <div className="photo flex-shrink-1 flex-grow-1" style={{backgroundImage: "url(" + myClub.ownerPhoto + ")"}}>
              <img src={myClub.ownerPhoto} alt="owner" />
            </div>
            <div className="description">
              <div className="name d-flex justify-content-between">
                <span className="label">name:</span>
                <span>{myClub.ownerName}</span>
              </div>
              <div className="age d-flex justify-content-between">
                <span className="label">age:</span>
                {/* <span>{new Date().getFullYear() - myClub.ownerBirthYear.getFullYear()}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="employee-box">
          <div className="employee trainer d-flex flex-column">
            <div className="position text-center">Trainer</div>
            <div className="photo flex-grow-1 flex-shrink-1" style={{backgroundImage: "url(" + myClub.trainerPhoto + ")"}}>
              <img src={myClub.trainerPhoto} alt="trainer" />
            </div>
            <div className="description">
              <div className="name d-flex justify-content-between">
                <span className="label">name:</span>
                <span>{myClub.trainerName}</span>
              </div>
              <div className="age d-flex justify-content-between">
                <span className="label">age:</span>
                {/* <span>{new Date().getFullYear() - myClub.trainerBirthYear.getFullYear()}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="title text-center">Stadium</div>

      <div className="stadium d-flex">
        <div className="name d-flex flex-column"><span>{myClub.stadiumName}</span></div>
        <div className="photo">
          <img src={myClub.stadiumPhoto} alt="stadium" />
        </div>
      </div>
    </div>
  )
};

class MyClub extends Component {

  renderView = () => {
    if (this.props.myClub.hasData) {
      return <ViewMyClub myClub={this.props.myClub.info} />
    } else {
      return <Placeholder title={<span><Link to="/my-club/configuration">Start</Link> club configuration</span>} />
    }
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
