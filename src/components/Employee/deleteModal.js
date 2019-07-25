import React from "react";

class DeleteModal extends React.Component {
  render() {
    return (
      <div className="ui segment blue">
        <div className="column">
          <h4>Are you sure?</h4>
          <div onClick={this.props.delete} className="ui button red">
            Delete
          </div>
          <div onClick={this.props.cancel} className="ui button">
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteModal;
