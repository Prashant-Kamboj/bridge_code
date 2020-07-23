import React, { Component } from "react";
import { connect } from "react-redux";
import './Preview.css'
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import Feedback from '../components/UI/feedback/Feedback';
import FeedbackIcon from '../components/UI/feedback/FeedbackIcon';
import {submitData} from './helper/previewHelper';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto
`;

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSubmitted: false
    };
  }

  setProperty = ({isLoading, isSubmitted}) => {
    if(isSubmitted) {
      this.setState({
        isLoading : false,
        isSubmitted: true,
      })
    }
    if(isLoading){
      this.setState({
        isLoading: true
      })
    }
   }

  handleSubmit = () => {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let postProject = this.props.projectDetails.filter((data) => delete data.recordStatus && delete data.SourceName);
    console.log(postProject)
    let postMilestoneData = this.props.milestone.filter((data) => data.recordStatus === "new" || data.recordStatus === undefined).filter((data) => delete data.recordStatus);
    console.log(postMilestoneData);
    let postRisk = this.props.risk.filter((data) => data.recordStatus === "new" || data.recordStatus === undefined).filter((data) => data.recordStatus ? delete data.recordStatus: data).filter((risk) => (risk.RiskMitigation.filter((data) => delete data.recordStatus)));
    console.log(postRisk);

    let updateMilestone = this.props.milestone.filter((data) => data.recordStatus === "updated").filter((data) => delete data.recordStatus && delete data.ProjectName && delete data.SourceName);

    console.log(updateMilestone);

    let updatedRisk = this.props.risk.filter((data) => data.recordStatus === "updated").filter((data) => delete data.recordStatus && delete data.ProjectName).filter((risk) => (risk.RiskMitigation.filter((data) => data.ProjectID === null || data.ProjectID ? delete data.recordStatus && delete data.ProjectID && delete data.ProjectName && delete data.RiskName && delete data.ProjectName : delete data.recordStatus)));

    console.log(updatedRisk);
    
    // post calls
    submitData(postProject, postRisk, postMilestoneData, updateMilestone, updatedRisk, this.setProperty);
   
  }

  handleEdit = () => {
    this.props.hidePreview()
  }

  componentDidMount(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {

    const projectNameMap = {
    ProjectName : "Project Name" ,
    ProjectDescription : "Project Description",
    ProjectType: "Project Type",
    ProjectCode: "Project Code",
    BillingType: "Billing Type",
    ProjectManager: "Project Manager" ,
    TechicalLead: "Technical Lead",
    BUFunctionalLead : "BU/Functional Lead",
    PlannedEffort: "Planned Effort",
    BaselineStartDate: "Baseline Start Date" ,
    BaselineEndDate: "Baseline End Date",
    ActualStartDate: "Actual Start Date",
    ActualEndDate: "Actual End Date",
    BaselineResourceAllocation: "RFP Effort (in person Weeks)",
    PNLBU: "P&LBU",
    ClientName: "Client Name",
    ResourceAllocated: "Resource Allocated"
    }

    const milestoneNameMap = {
    
    MilestoneName: "Milestone Name",
    MilestoneSummary:"Milestone Summary",
    MilestoneStatus: "Milestone Status",
    MilestonePlannedStartDate: "Milestone Planned Start Date",
    MilestonePlannedEndDate: "Milestone Planned End Date",
    }

    const riskNameMap = {
    RiskName: "Risk Name",
    RiskDescription: "Risk Description",
    RiskImpactArea: "Risk Impact Area",
    RiskImpactScale: "Risk Impact Scale",
    RiskProbabilityScale: "Risk Probability Scale",
    RiskPlannedClosureDate: "Risk Planned Closure Date",
    RiskStatus: "Risk Status",
    RiskCategory: "Risk Type",
    MilestoneName: "Milestone Name",
    }

    const mitigationNameMap = {
      RiskMitigationSteps: "Risk Mitigation Next Step",
      RiskMitigationStepsOwner: "Risk Mitigation Next Step Owner",        
      RiskMitigationStepsETA: "Risk Mitigation Next Step ETA",
      RiskMitigationStatus: "Status"
    }

    const exclude = [
      "ProjectID",
      "MilestoneID",
      "recordStatus",
      "StatusDatePeriod",
      "RiskID",
      "SourceName",
      "RiskRagID"
    ];

    const mitigationExclude = ['RiskName', 'ProjectName','SourceName']
    return (
      <div className="preview-data">
        <div className="projectData">
          {this.props.projectDetails.map((data, index) =>
            Object.keys(data).map((key, i) =>
              exclude.includes(key) === false ? (
                <div className="projetdetails" key={index+i+`${key}`} style={{ margin: "1rem" }}>
                  <label>{projectNameMap[key]}</label> <div>{data[key]}</div>
                </div>
              ) : null
            )
          )}
        </div>
        <div className="milestone-details">
          {this.props.milestone.map((data, index) => data["recordStatus"] === "removed" ? null : <div className="milestone" id={index} key={index} > {
            Object.keys(data).map((key, i) =>
              exclude.includes(key) === false && key !== "ProjectName" ? (
                <div id={index+i} key={i+`_${key}` } style={{ margin: "1rem" }}>
                  <label>{milestoneNameMap[key]}</label> <div>{data[key]}</div>
                </div>
              ) : null
            )}
            </div>
          )}
        </div>

       { this.props.risk.length > 0 ? <div className="risk-data">
          {this.props.risk.map((data, ind) => {
            return <div key={ind} className="risk-details">{
              Object.keys(data).map((key, i) => {
                if (key === "RiskMitigation") {
                return data[key].length > 0 ? <div key={ind+i} style={{display:`${data[key].filter((mitigation)=> mitigation.recordStatus !=="removed").length > 0 ? 'block' : 'none'}`}} className="mitigation-main">{
                  data[key].map((riskMitiData, index) => riskMitiData["recordStatus"] === "removed" ? null : <div key = {index} className="mitigation-data">{
                    Object.keys(riskMitiData).map((mitiKey, i) => 
                      exclude.includes(mitiKey) === false &&
                      mitiKey !== "RiskMitigationID" && mitigationExclude.includes(mitiKey) === false ? (
                        <div className="mitigation" id={i} key={i} style={{ margin: "1rem" }}>
                          <label>{mitigationNameMap[mitiKey]}</label>{" "}
                          <div>{riskMitiData[mitiKey]}</div>
                        </div>
                      ) : null 
                    ) }</div>
                  ) 
                  }</div> : null;
                } else {
                  return exclude.includes(key) === false && key !== 'ProjectName'  ? (
                    <div className="risk" id={i+ind} key={i+ind} style={{ margin: "1rem" }}>
                      <label>{riskNameMap[key]}</label> <div>{data[key]}</div>
                    </div>
                  ) : null;
                }
              })
              }</div>
          })}
        </div> : null}
        <div className="preview-btns">
          <div className="preview-edit"> <button className="preview-edit-btn" onClick={this.handleEdit}>EDIT</button></div>
          <div className="preview-submit"> <button className="preview-submit-btn" onClick={this.handleSubmit}>SUBMIT</button></div>
        </div>
        <div className="submited" style={{display:`${this.state.isSubmitted ? 'block': 'none'}`}}>
          <p className="success-text">Submitted Successfully </p>
        </div>
        <div className="sweet-loading" style={{display:`${this.state.isLoading ? 'block': 'none'}`}}>
              <div className="loader">
              <SyncLoader
                css={override}
                size={15}
                color={"#00bcd4"}
                loading={this.state.isLoading}
              />
            </div>
            </div>
            <Feedback />
            <FeedbackIcon displayFeedback={this.props.displayFeedback} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectDetails: state.projectReducer,
    milestone: state.milestoneReducer,
    risk: state.riskReducer,
    mainData : state.mainReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hidePreview: () => dispatch({type:'PREVIEWHIDE'}),
    displayFeedback: () => dispatch({type:'SHOWFEEDBACK'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
