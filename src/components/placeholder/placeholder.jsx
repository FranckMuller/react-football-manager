import React from 'react';
import Spinner from '../spinner';

import './placeholder.scss';

const Placeholder = ({ title }) => {
  return (
    <div className="placeholder">
      <h3 className="title text-center">{title}</h3>
      <Spinner />
    </div>
  );
};

export default Placeholder;
