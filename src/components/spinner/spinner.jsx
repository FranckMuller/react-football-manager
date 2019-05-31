import React from 'react';

import './spinner.scss';

const Spinner = () => {
  return (
    <div className="lds-css ng-scope spinner d-flex align-items-center justify-content-center">
      <div className="lds-ball"><div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;