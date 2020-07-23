import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import "./Feedback.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto
`;


class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desctiption: "",
      success: false
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleDescription = (e) => {
    if(e.target.value.length === 501){
      return
    }
    this.setState({
      desctiption: e.target.value
    })
  }

  handleSubmit = () => {
    this.setState({
      success: true
    })
  axios.post('https://bridgei2ipaibackendapp.azurewebsites.net/dataset/Feedback', [{YourName: this.state.name, FeedbackDesc: this.state.desctiption}]).then((res) => {
    if(res.status === 200){
      this.props.hideFeedback()
      this.setState({
        name: "",
        desctiption: "",
        success: false
      })
    }
   
  });
  }

  handleClose = () => {
    this.setState({
      name: "",
      desctiption: ""
    })
    this.props.hideFeedback()
  }

  render() {
    return (
      <div
        id="feedback-modal"
        className="modal"
        style={{ display: `${this.props.showFeedback ? "block" : "none"}` }}
      >
        <div className="modal-content">
        <div className="close-feedback">
          <i
            className="fa fa-times"
            style={{
              fontSize: "20px",
              margin: "0rem",
              paddingTop: "0.5rem",
              cursor: "pointer",
              color: "red",
            }}
            onClick={this.handleClose}
          />
        </div>
          <div className="name-filed" style={{ margin: "2rem", marginTop: '0' }}>
            <label>Name</label>
            <div className="input-outer" style={{ width: "50%" }}>
              <input type="text" 
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleNameChange}
              />
            </div>
          </div>
          <div className="describe" style={{ margin: "2rem" }}>
            <label>Describe Feedback</label>
            <div className="desc-container">
              <textarea
                className="input-outer feedback-textarea"
                placeholder="Describe feedback"
                style={{maxWidth:'100%'}}
                value={this.state.desctiption}
                onChange={this.handleDescription}
              />
              <div className="text-counter" style={{float:'right'}}>{this.state.desctiption.length}/500 </div>
            </div>
          </div>
          <div className="feedback-sub-btn">
            <button className="submit-btn" onClick={this.handleSubmit}>SUBMIT</button>
          </div>
        </div>
        <div className="sweet-loading" style={{display:`${this.state.success ? 'block': 'none'}`}}>
              <div className="loader" style={{top: '38%'}}>
              <ClipLoader
                css={override}
                size={50}
                color={"#00bcd4"}
                loading={this.state.success}
              />
            </div>
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showFeedback: state.mainReducer.showFeedback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayFeedback: () => dispatch({ type: "SHOWFEEDBACK" }),
    hideFeedback: () => dispatch({ type: "HIDEFEEDBACK" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
