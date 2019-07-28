import React from 'react';

import './button.scss';

const Button = (props) => {
  const {
    btnLabel,
    btnAction = () => { console.log('btn action') },
    disable = false,
    classes } = props;

  return (
    <button
      onClick={btnAction}
      disabled={disable}
      className={`button btn ${classes}`}>{btnLabel}</button>
  );
};

export default Button;
