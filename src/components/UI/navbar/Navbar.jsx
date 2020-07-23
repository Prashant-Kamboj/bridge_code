import React, { Component } from "react";
import logo from "../../../assets/logo.jpg";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Nav.css";
import ProjectDetails from "../../rarelyUpdated/ProjectDetails/ProjectDetails";
import Risk from "../../weeklyUpdated/Risk/Risk";
import Milestone from "../../weeklyUpdated/Milestone/Milestone";
import Select from "react-select";
import Nav from "../Navigation/Nav";
import { connect } from "react-redux";
import {
  getAllProjects,
  getProjectDetails,
  getMilestoneData,
  getRiskData,
} from "../../../service/services";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import Feedback from "../feedback/Feedback";
import FeedbackIcon from "../feedback/FeedbackIcon";
import Alert from "../alert/Alert";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProjectSelected: true,
      isMilestoneSelected: false,
      isRiskSelected: false,
      isLoading: false,
      projectId: "",
      projectName: "",
      projectOptions: [],
      isProjectNameSelected: false,
      showSidebar: false,
      showAlert: false,
      goToDashboard: false,
    };
  }

  handleProject = () => {
    this.setState({
      isProjectSelected: true,
      isMilestoneSelected: false,
      isRiskSelected: false,
    });
  };

  handleMilestone = () => {
    this.setState({
      isProjectSelected: false,
      isMilestoneSelected: true,
      isRiskSelected: false,
    });
  };

  handleRisk = () => {
    this.setState({
      isProjectSelected: false,
      isMilestoneSelected: false,
      isRiskSelected: true,
    });
  };

  handleProjectSelection = (value) => {
    this.setState({
      isProjectNameSelected: value,
    });
  };

  handleShowAlert = () => {
    this.setState((prevState, props) => {
      return {
        showAlert: !prevState.showAlert,
      };
    });
  };

  componentDidMount() {
    this.props.hidePreview();
    if (this.props.mainData.selectedProject.id) {
      this.handleProjectData(this.props.mainData.selectedProject);
    }
    // this.props.setSelectedProject(this.props.mainData.selectedProject);
    // this.setState({
    //   projectId: this.props.mainData.selectedProject.id
    // })

    Promise.all([getAllProjects()]).then((data) => {
      const projectData = data[0].map((project) => {
        return { value: project.Name, label: project.Name, id: project.ID };
      });
      this.setState({
        projectOptions: projectData,
      });
    });

    if (this.props.projectData[0].ProjectName !== "") {
      this.setState({
        projectName: this.props.projectData[0].ProjectName,
      });
    }
  }

  handleProjectData = (data) => {
    this.setState({
      isLoading: true,
    });

    this.props.setSelectedProject(data);

    this.props.setProjectData(data.value, "ProjectName", 0);
    this.setState({
      projectName: data.value,
    });
    this.props.insertMilestone([]);
    this.props.insertRisk([]);

    let projectId = this.props.mainData.selectedProject.id;

    Promise.all([
      getProjectDetails(projectId),
      getMilestoneData(projectId),
      getRiskData(projectId),
    ]).then(([projectData, milestoneData, riskData]) => {
      const projectFormatedData = projectData.map((data) => {
        return { ...data, recordStatus: "db" };
      });
      this.props.insertMilestoneValidation(milestoneData.length);

      this.props.insertProject(projectFormatedData);

      const exclude = [
        "ProjectID",
        "ProjectCode",
        "BUFunctionalLead",
        "ClientName",
        "TechicalLead",
        "ResourceAllocated",
      ];

      projectData.forEach((data, index) => {
        Object.keys(data).forEach((key) => {
          if (exclude.includes(key) === false) {
            if (data[key] !== "" || data[key] !== null) {
              this.props.validate(false, key);
            }
          }
        });
      });
      if (projectData[0].PlannedEffort) {
        this.props.setProjectData(
          projectData[0].PlannedEffort.toString(),
          "PlannedEffort",
          0
        );
      }
      if (projectData[0].BaselineResourceAllocation) {
        this.props.setProjectData(
          projectData[0].BaselineResourceAllocation.toString(),
          "BaselineResourceAllocation",
          0
        );
      }
      this.props.setProjectData("", "ResourceAllocated", 0);
      this.props.insertMilestone(milestoneData);
      this.props.insertRiskValidation(riskData.length);

      let riskMitigationArr = riskData
        .map((risk) =>
          risk.RiskMitigation && risk.RiskMitigation.length > 0
            ? risk.RiskMitigation
            : []
        )
        .filter((data) => data !== null);

      this.props.insertMitigation(riskMitigationArr);

      riskData.map(
        (risk) =>
          (risk.RiskMitigation = risk.RiskMitigation.map((mitigation) => {
            return { ...mitigation, recordStatus: "db" };
          }))
      );
      let riskFormatedData = riskData.map((data) => {
        return { ...data, recordStatus: "db" };
      });
      this.props.insertRisk(riskFormatedData);

      this.setState({
        isLoading: false,
      });
    });
  };

  handleSidebar = () => {
    this.setState({
      showSidebar: true,
    });
  };

  handleDashboardAlert = () => {
    this.handleShowAlert();
  };

  handleGoToDash = () => {
    this.setState({
      goToDashboard: true,
    });
    this.handleShowAlert();
    this.props.handleDashboard();
  };

  render() {
    const {
      isProjectSelected,
      isMilestoneSelected,
      isRiskSelected,
    } = this.state;

    return (
      <>
        <Router>
          <div
            className="Sidebar visible-xs"
            style={{
              visibility: `${this.state.showSidebar ? "visible" : "hidden"}`,
            }}
          ></div>
          {this.props.isPreviewSelected ? null : (
            <div className="nav-bar">
              <i
                className="fa fa-bars visible-xs"
                onClick={this.handleSidebar}
              ></i>
              <div className="logo">
                <img src={logo} alt="logo" className="logo-img" />
              </div>
              <Nav
                clickProject={this.handleProject}
                clickMilestone={this.handleMilestone}
                clickRisk={this.handleRisk}
                isProjectSelected={isProjectSelected}
                isMilestoneSelected={isMilestoneSelected}
                isRiskSelected={isRiskSelected}
              />

              <div className="search-project" style={{ cursor: "pointer" }}>
                <Select
                  placeholder="Select Project"
                  // isLoading={false}
                  value={
                    this.props.mainData.selectedProject &&
                    this.props.mainData.selectedProject.value
                      ? {
                          value: `${this.props.projectData[0].ProjectName}`,
                          label: `${this.props.projectData[0].ProjectName}`,
                        }
                      : null
                  }
                  onChange={(data) => this.handleProjectData(data)}
                  name="ProjectName"
                  options={this.state.projectOptions}
                />
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    display: `${
                      this.props.projectValidate.ProjectName &&
                      this.state.isProjectNameSelected
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  Please select project
                </div>
              </div>
              <div style={{ padding: "23px" }}>
                <i
                  class="fa fa-sign-out"
                  title="logout"
                  aria-hidden="true"
                  style={{ fontSize: "33px", color: "gray", cursor: "pointer" }}
                  onClick={this.props.handleLogout}
                ></i>
              </div>
            </div>
          )}

          <div className="content" style={{ marginTop: "1rem" }}>
            {this.props.isPreviewSelected ? null : (
              <div className="action-btn">
                <Link to="/">
                  <button className="homebutton" onClick={this.props.goHome}>
                    Go Home
                  </button>
                </Link>
                <Link to="/PAI-InputTool">
                  <button
                    className="dashboardbutton"
                    onClick={this.handleDashboardAlert}
                  >
                    Go To Dashboard
                  </button>
                </Link>
              </div>
            )}

            {this.state.isProjectSelected ? (
              <ProjectDetails
                next={this.handleMilestone}
                selectProjectName={this.handleProjectSelection}
              />
            ) : null}
            {this.state.isMilestoneSelected ? (
              <Milestone
                current={this.handleMilestone}
                next={this.handleRisk}
                back={this.handleProject}
              />
            ) : null}
            {this.state.isRiskSelected ? (
              <Risk current={this.handleRisk} back={this.handleMilestone} />
            ) : null}

            <div
              className="sweet-loading"
              style={{ display: `${this.state.isLoading ? "block" : "none"}` }}
            >
              <div className="loader">
                <SyncLoader
                  css={override}
                  size={15}
                  color={"#00bcd4"}
                  loading={this.state.isLoading}
                />
              </div>
            </div>
            <Alert
              showAlert={this.state.showAlert}
              handleAlert={this.handleShowAlert}
              goToDash={this.handleGoToDash}
            />
            <Feedback />
            {this.props.isPreviewSelected ? null : (
              <FeedbackIcon displayFeedback={this.props.displayFeedback} />
            )}
          </div>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectData: state.projectReducer,
    mainData: state.mainReducer,
    isPreviewSelected: state.mainReducer.isPreviewSelected,
    projectValidate: state.validateReducer.projectData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setProjectData: (value, name, id) =>
      dispatch({ type: "INSERTDATA", value, key: name, index: id }),
    insertMilestone: (data) => dispatch({ type: "INSERTMILESTONE", data }),
    insertProject: (data) => dispatch({ type: "INSERTPROJECT", data }),
    insertRisk: (data) => dispatch({ type: "INSERTRISK", data }),
    hidePreview: () => dispatch({ type: "PREVIEWHIDE" }),
    insertMilestoneValidation: (length) =>
      dispatch({ type: "INSERTMILESTONEVALIDATION", milestoneLength: length }),
    insertRiskValidation: (length) =>
      dispatch({ type: "INSERTRISKVALIDATION", riskLength: length }),
    insertMitigation: (riskData) =>
      dispatch({ type: "INSERMITIGATIONVALIDATION", riskData }),
    validate: (value, key) =>
      dispatch({ type: "VALIDATEPROJECTDATA", value, key }),
    displayFeedback: () => dispatch({ type: "SHOWFEEDBACK" }),
    setSelectedProject: (projectData) =>
      dispatch({ type: "SETPROJECTDATA", data: projectData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
