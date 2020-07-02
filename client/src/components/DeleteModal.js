import React, { useState, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { deleteIssue } from '../actions/issueActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DeleteModal = ({ id, history, deleteIssue }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Fragment>
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
            onClick={() => deleteIssue(id, history)}
            className="mt-3"
          >
            Delete
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

DeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

export default connect(null, { deleteIssue })(DeleteModal);
