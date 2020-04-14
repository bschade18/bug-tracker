import React from 'react';
import { Alert } from 'reactstrap';

const ShowAlert = ({ alert }) => {
  return alert !== null && <Alert color="danger">{alert.msg}</Alert>;
};

export default ShowAlert;
