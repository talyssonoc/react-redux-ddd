/* @flow */
import React from 'react';
export type Props = { errors: ?Object };

const ErrorMessages = (props: Props) => {
  const { errors } = props;

  return errors ? (
    <ul className="error-messages">
      {
        mapErrors(errors, (fieldName, errorMessage) =>
          <li key={ `${fieldName}-${errorMessage}` }>
            { fieldName } { errorMessage }
          </li>
        )
      }
    </ul>
  ) : null;
};

const mapErrors = (errors, mapper) => (
  toArray(errors).reduce((errorMessages, [fieldName, fieldErrors]) => [
    ...errorMessages,
    ...fieldErrors.map((errorMessage) => (
      mapper(fieldName, errorMessage)
    ))
  ], [])
);

const toArray = (errors) => (
  Object.keys(errors).map((fieldName) => [fieldName, errors[fieldName]])
);

export default ErrorMessages;
