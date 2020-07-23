import React, { Component } from "react";

class FeedbackIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="icon-container-main"
        style={{ display: "flex", flexDirection:'column' }}
      >
        <div className="help-icon-container">
          <div  title="help" className="help-icon">
            <i 
            className="fa fa-question" 
            id="icon-help"></i>
          </div>
        </div>
        <div className="feedback-icon-container">
          <div
            title="Feedback"
            className="feedback-icon"
            onClick={() => this.props.displayFeedback()}
            style={{ marginLeft: 0 }}
          >
            <i
              className="fa fa-thumbs-o-up"
              id="icon-feedback"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackIcon;
