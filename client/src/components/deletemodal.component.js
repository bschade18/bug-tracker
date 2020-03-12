import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  deleteExercise = id => {
    axios.delete(`/issue/${id}`).then(response => {
      console.log(response.data);
    });
    window.location = "/";
    console.log("wtf");
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
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => this.deleteExercise(this.props.id)}
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