import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ field, alerts }) => {
  const filterForFieldError = () =>
    alerts.filter((alert) => alert.param === field);

  if (filterForFieldError().length) {
    const msg = filterForFieldError()[0].msg;
    return <p className="error">{msg}</p>;
  } else {
    return null;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.error.errors,
});

export default connect(mapStateToProps)(Alert);
