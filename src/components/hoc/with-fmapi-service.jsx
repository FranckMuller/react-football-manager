import React from 'react';
import { FmapiServiceConsumer } from '../fmapi-service-context';

const withFmapiService = (Wrapped) => {
  return (props) => {
    return (
      <FmapiServiceConsumer>
        {
          (fmapiService) => {
            return (
              <Wrapped {...props} fmapiService={fmapiService} />
            )
          }
        }
      </FmapiServiceConsumer>
    );
  };
};

export default withFmapiService;
