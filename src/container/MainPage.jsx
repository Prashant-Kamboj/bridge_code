import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Start from "./Start";
import "./MainPage.css";
import Dashboard from "../components/Dashboard/Dashboard";
import DashboardLogo from "../assets/dashboard.png";
import InputLogo from "../assets/input.png";
import Loginbygoogle from './Loginbygoogle';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: true,
      showInput: false,
      showDashboard: false,
      isLogedIn: false,
      isUserActive: false
    };
  }

  handleShowHome = () => {
    this.setState((prevState, props) => {
      return {
        showHome: true,
        showInput: false,
        showDashboard: false,
      };
    });
  };

  handleShowInput = () => {
    this.setState({
      showHome: false,
      showInput: true,
      showDashboard: false
    });
  };

  handleShowDashboard = () => {
    this.setState({
      showDashboard: true,
      showHome: false,
      showInput: false,
    });
  };

  componentDidMount(){
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData) {
      this.setState({
        isUserActive: userData ? true : false
      })
    }
   
      let path = window.location.pathname.split('/').join('');
      if(path === 'Dashboard'){
        this.setState({
            showDashboard: true,
            showHome: false,
            showInput: false,
          });
      }
  }

  setLogin = () => {
    this.setState({
      isLogedIn: true
    })
  }

  setLogout = () => {
    this.setState({
      isLogedIn: false,
      isUserActive: false
    })
  }
  render() {
    return (
      <>
      {!this.state.isUserActive && !this.state.isLogedIn ? <Loginbygoogle successLogin={this.setLogin}/> : 
      <Router>
        {this.state.showHome ? (
          <div
            className="main-page"
            style={{ height: "100vh", paddingTop: "36vh" }}
          >
            <div className="inner-container">
              <div className="input-tool">
                {" "}
                <Link to="/PAI-InputTool">
                  <img
                    style={{ height: "145px", marginTop: "11px" }}
                    src={InputLogo}
                    alt="input tool"
                    onClick={this.handleShowInput}
                  />
                </Link>{" "}
                <p className="input-tool-text">Input Tool</p>
              </div>
              <div
                className="dashboard-tool"
                onClick={this.handleShowDashboard}
              >
                {" "}
                <Link to="/Dashboard">
                  <img
                    style={{ height: "158px" }}
                    src={DashboardLogo}
                    alt="dashboard"
                  />
                </Link>{" "}
                <p className="dashboard-tool-text">Dashboard</p>
              </div>
            </div>
          </div>
        ) : null}
        { this.state.showDashboard ? 
         <Dashboard
                goHome={this.handleShowHome}
                showDashboard={this.state.showDashboard}
                handleDashboard={this.handleShowDashboard}
                handleShowInput={this.handleShowInput}
              /> : null}
        <Switch>
          <Route
            exact
            path="/PAI-InputTool"
            render={() => (
              <Start
                showInputHandler={this.handleShowInput}
                showInput={this.state.showInput}
                logout={this.setLogout}
                goHome={this.handleShowHome}
                handleDashboard={this.handleShowDashboard}
              />
            )}
          ></Route>
        </Switch>
      </Router>
  }
      </>
    );
  }
}

export default MainPage;
