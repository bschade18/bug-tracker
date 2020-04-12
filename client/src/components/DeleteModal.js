import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  deleteIssue = (id) => {
    axios.delete(`/issue/${id}`).then((response) => {
      console.log(response.data);
    });
    setTimeout(() => (window.location = '/main'), 500);
  };

  render() {
    return (
      <div>
        <input
          type="button"
          onClick={this.toggle}
          value="Delete"
          className="btn btn-danger mt-4 mb-4"
        />
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
          <ModalHeader>Delete Issue?</ModalHeader>
          <ModalBody>
            This can't be undone and will remove any record of this issue.
            <Button color="secondary" onClick={this.toggle} className="mt-3">
              Cancel
            </Button>{' '}
            <Button
              color="danger"
              onClick={() => this.deleteIssue(this.props.id)}
              className="mt-3"
            >
              Delete
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
