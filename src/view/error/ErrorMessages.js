import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessages = ({ errors }) => (
  errors ? (
    <ul className="error-messages">
      {
        Object.keys(errors).map((errorName) => (
          <li key={ errorName }>
            { errorName} { errors[errorName] }
          </li>
        ))
      }
    </ul>
  ) : null
);

ErrorMessages.propTypes = {
  errors: PropTypes.object
};

export default ErrorMessages;
