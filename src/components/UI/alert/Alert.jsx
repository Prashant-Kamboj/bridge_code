import React, { Component } from "react";
import {Link} from 'react-router-dom';


class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClose = () => {

  }

  render() {
    return (
      <div
        id="alert-modal"
        className="modal"
        style={{ display: `${this.props.showAlert ? "block" : "none"}` }}
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
            onClick={this.props.handleAlert}
          />
        </div>
        
         <div className="alert-message" style={{textAlign:'center'}}>
             <h3 style={{marginTop:'0px'}}>Any changes not submitted will be lost</h3>
             <h4>To continue press OK</h4>
        </div>
        <div className="alert-btn" style={{display:'flex', justifyContent:'center'}}>
        <Link to='/Dashboard'><button style={{width:'120px', height:'37px'}} onClick={this.props.goToDash}> OK </button></Link> 
        </div>
        </div>
      </div>
    );
  }
}

export default Alert;
