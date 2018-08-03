/* @flow */
import React from 'react';
export type Props = { errors?: Object };

const ErrorMessages = (props: Props) => {
  const { errors } = props;

  return errors ? (
    <ul className="error-messages">
      {
        Object.keys(errors).map((errorName) => (
          <li key={ errorName }>
            { errorName} { errors[errorName] }
          </li>
        ))
      }
    </ul>
  ) : null;
};

export default ErrorMessages;
