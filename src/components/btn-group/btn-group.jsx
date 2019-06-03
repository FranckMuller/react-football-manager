import React from 'react';

import './btn-group.scss';

const BtnGroup = (props) => {

  const { leftBtnLabel,
          rightBtnLabel,
          leftBtnAction = null,
          rightBtnAction = null,
          rightBtnProps = null,
          leftBtnProps = null,
          disabled = false } = props;

  if(!leftBtnLabel && !rightBtnLabel) return null;

  return (
    <div className="btn-group">
      <button
        onClick={() => leftBtnAction(leftBtnProps)} 
        disabled={disabled} 
        className="btn btn-success">{leftBtnLabel}</button>
      <button 
        onClick={() => rightBtnAction(rightBtnProps)} 
        disabled={!disabled} className="btn btn-danger">{rightBtnLabel}</button>
    </div>
  );

};

export default BtnGroup;
