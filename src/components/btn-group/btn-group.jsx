import React from 'react';

import './btn-group.scss';

const BtnGroup = (props) => {

  const { leftBtnLabel,
          rightBtnLabel,
          leftBtnAction = () => {console.log('leftBtnAction')},
          rightBtnAction = () => {console.log('rightBtnAction')},
          leftBtnDisabled = false,
          rightBtnDisabled = false  } = props;

  return (
    <div className="btn-group">
      <button
        onClick={leftBtnAction} 
        disabled={leftBtnDisabled} 
        className="btn btn-success">{leftBtnLabel}</button>
      <button 
        onClick={rightBtnAction} 
        disabled={rightBtnDisabled} className="btn btn-danger">{rightBtnLabel}</button>
    </div>
  );

};

export default BtnGroup;
