import React from 'react';

import './btn-group.scss';

const BtnGroup = (props) => {

  const { leftBtnLabel,
          rightBtnLabel,
          leftBtnAction = () => {console.log('leftBtnAction')},
          rightBtnAction = () => {console.log('rightBtnAction')},
          disabled = false } = props;

  if(!leftBtnLabel && !rightBtnLabel) return null;

  return (
    <div className="btn-group">
      <button
        onClick={leftBtnAction} 
        disabled={disabled} 
        className="btn btn-success">{leftBtnLabel}</button>
      <button 
        onClick={rightBtnAction} 
        disabled={disabled} className="btn btn-danger">{rightBtnLabel}</button>
    </div>
  );

};

export default BtnGroup;
