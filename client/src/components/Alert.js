import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const ShowAlert = ({ alert }) => {
  return (
    alert !== '' && alert !== null && <Alert color="danger">{alert}</Alert>
  );
};

ShowAlert.propTypes = {
  alert: PropTypes.string,
};

export default ShowAlert;
