import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyClubForm from '../my-club-form';
import Placeholder from '../placeholder';
import Moment from 'react-moment';

import 'moment-timezone';

import './my-club.scss';

const ViewMyClub = ({ myClub }) => {

  const { clubName, clubLogo } = this.props;

  return (
    <div className="view-my-club">
      <h3 className="title text-center d-flex align-items-center justify-content-center">FC {clubName} <span><img src={clubLogo} alt="logo" /></span></h3>
      {/* <div className="employees d-flex">
        <div className="employee-box">
          <div className="employee owner">
            <div className="position text-center">Owner</div>
            <div className="description">
              <div className="photo">
                <img src={clubInfo.owner.image} alt="" />
              </div>
              <div className="name d-flex justify-content-between">
                <span className="label">name:</span>
                <span>{clubInfo.owner.name}</span>
              </div>
              <div className="name d-flex justify-content-between">
                <span className="label">birth year:</span>
                <span><Moment format="MMMM Do YYYY">{clubInfo.owner.birthYear}</Moment></span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )

  // return (
  //   <div className="view-my-club">
  //     <h3 className="title text-center d-flex align-items-center justify-content-center">FC {clubInfo.club.name} <span><img src={clubInfo.club.image} alt="logo" /></span></h3>
  //     <div className="employees d-flex">
  //       <div className="employee-box">
  //         <div className="employee owner">
  //           <div className="position text-center">Owner</div>
  //           <div className="description">
  //             <div className="photo">
  //               <img src={clubInfo.owner.image} alt="" />
  //             </div>
  //             <div className="name d-flex justify-content-between">
  //               <span className="label">name:</span>
  //               <span>{clubInfo.owner.name}</span>
  //             </div>
  //             <div className="name d-flex justify-content-between">
  //               <span className="label">birth year:</span>
  //               <span><Moment format="MMMM Do YYYY">{clubInfo.owner.birthYear}</Moment></span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
