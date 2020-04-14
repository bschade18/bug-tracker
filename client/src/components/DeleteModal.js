import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

const DeleteModal = ({ id }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const deleteIssue = (id) => {
    axios.delete(`/issue/${id}`).then((response) => {
      console.log(response.data);
    });
    setTimeout(() => (window.location = '/main'), 500);
  };

  return (
    <div>
      <input
        type="button"
        onClick={toggle}
        value="Delete"
        className="btn btn-danger mt-4 mb-4"
      />
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader>Delete Issue?</ModalHeader>
        <ModalBody>
          This can't be undone and will remove any record of this issue.
          <Button color="secondary" onClick={toggle} className="mt-3">
            Cancel
          </Button>{' '}
          <Button
            color="danger"
            onClick={() => deleteIssue(id)}
            className="mt-3"
          >
            Delete
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteModal;
