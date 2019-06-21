import React from 'react';

import './button.scss';

const Button = (props) => {
  const {
    btnLabel,
    btnAction = () => { console.log('btn action') },
    disable = false,
    classes } = props;

  return (
    <div className="btn-group">
      <button
        onClick={btnAction}
        disabled={disable}
        className={`button btn ${classes}`}>{btnLabel}</button>
    </div>

  );
};

export default Button;
