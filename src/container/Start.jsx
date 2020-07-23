import React, { Component } from "react";
import Navbar from '../components/UI/navbar/Navbar';
import {connect} from 'react-redux';

class Start extends Component {

  componentDidMount(){
    this.props.showInputHandler();
  }

  render() {
    return (
      <>
      {this.props.showInput ? <Navbar goHome={this.props.goHome}  handleDashboard={this.props.handleDashboard} handleLogout={this.props.logout} /> :  null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
    isPreviewSelected : state.mainReducer.isPreviewSelected,
  }
}
export default connect(mapStateToProps, null)(Start);
