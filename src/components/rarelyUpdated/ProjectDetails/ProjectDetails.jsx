import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./ProjectDetails.css";
import moment from 'moment';
import {DebounceInput} from 'react-debounce-input'

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billingType: [
        { value: "Fixed Price", label: "Fixed Price" },
        { value: "T&M", label: "T&M" },
        { value: "Outcome Basis", label: "Outcome Basis" },
      ],
      projectType: [
        { value: "Application Development", label: "Application Development" },
        { value: "Data Engineering & BI", label: "Data Engineering & BI" },
        { value: "AI Operationalization", label: "AI Operationalization" },
        { value: "AI Actions", label: "AI Actions" },
        { value: "Digital Transformation", label: "Digital Transformation" },
        { value: "POC", label: "POC" },
      ],
      p_l_BU:[
        {value:'IA-Service Delivery',label:'IA-Service Delivery'},
        {value:'IA-AI Actions',label:'IA-AI Actions'},
        {value:'Data Engineering and BI',label:'Data Engineering and BI'},
        {value:'CPG',label:'CPG'},
        {value:'FS',label:'FS'},
        {value:'Insurance',label:'Insurance'},
        {value:'CDT',label:'CDT'},
        {value:'Enterprise Tech',label:'Enterprise Tech'},
        {value:'Supply Chain',label:'Supply Chain'}
      ],
      isDisabled: true,
      isValidated: false,
      isCorrect: false
    };
  }

  handleEdit = () => {
    this.setState({
      isDisabled: false,
    });
  };

  handeDateSelection = (date, name, index) => {
    console.log(date)
    if(date && date !== "" && date !== "Invalid date"){

      this.props.validate(false, name);
      const formatedDate = moment(date).format('YYYY-MM-DD');
      console.log(formatedDate)
    this.props.insertData(formatedDate, name, index)
    } else {
      this.props.validate(true, name);
      this.setState({
        isCorrect: true
      })
    }
  };

  handleDropdownSelection = (value, name, index) => {
    if(value.value !== "") {
      this.props.validate(false, name);
    }
    this.props.insertData(value.value, name, index);
  };

  handleTextInput = (value, name, index) => {
   if(value.length === 0){
    this.props.validate(true, name);
   } else {
    this.props.validate(false, name);
    if(name === "PlannedEffort"){
      if (!Number(value)) {
        return;
      }

    }
    if(name === "BaselineResourceAllocation"){
      if (!Number(value)) {
        return;
      }
    }
    if(name === "ProjectDescription"){
      if(value.length === 2001){
        return;
      }
    }
   }
   this.props.insertData(value, name, index);
  };

  checkRoute = () => {

    const exclude = ['ProjectID', 'ProjectCode','BUFunctionalLead', 'ClientName','TechicalLead',"ResourceAllocated"]
    const projectData = this.props.rareData
    let emptyFieldCount  = 0;

    projectData.forEach((data, index) => {
      Object.keys(data).forEach((key) => {
        if(exclude.includes(key) === false) {
          if(data[key] === "" || data[key] === null){
            emptyFieldCount++; 
          }
        } 
      })

    })

    if(emptyFieldCount > 0) {
      this.setState({
        isCorrect: false
      })
    } else {
      this.setState({
        isCorrect: true
      })
    }
  }

  checkValidation = () => {
    const exclude = ['ProjectID', 'ProjectCode','BUFunctionalLead', 'ClientName','TechicalLead',"ResourceAllocated"]
    const projectData = this.props.rareData
    let emptyFieldCount  = 0;

    projectData.forEach((data, index) => {
      Object.keys(data).forEach((key) => {
        if(exclude.includes(key) === false) {
          if(data[key] === "" || data[key] === null){
            if(key === "ProjectName"){
              this.props.selectProjectName(true)
            }
            emptyFieldCount++;
            this.props.validate(true, key);     
          }
        } 
      })

    })

    if(emptyFieldCount > 0) {
      this.setState({
        isValidated: false
      })
    }
    if(emptyFieldCount === 0) {
      this.setState({
        isValidated: true
      })
    }
    if(this.state.isCorrect){
      this.props.next()
    }
  }

  render() {
    const { isDisabled } = this.state;
    const { rareData } = this.props;

    return (
      <div>
        {rareData.map((details, index) => (
                  <div className="card" key={index}>
                  <div
                    className="row"
                    style={{ padding: ".5rem 1rem", paddingBottom: "8px" }}
                  >
                    <div className="col-md-2">
                      <label>Project Code </label>
                      <div className="input-outer">
                       
                        <DebounceInput
                      minLength={1}
                      value={details.ProjectCode && details.ProjectCode !== null ? details.ProjectCode : ""}
                      disabled={isDisabled || details.SourceName === 'Jira'}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'ProjectCode', index)} />
                     
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Project Manager<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                       
                     <DebounceInput
                      minLength={1}
                      value={details.ProjectManager && details.ProjectManager !== "" ? details.ProjectManager : ""}
                      disabled={isDisabled || details.SourceName === 'Jira'}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'ProjectManager', index)} />
                     
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["ProjectManager"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Project Type<span style={{color: 'red', margin:'0'}}>*</span> </label>
                      <div>
                        <Select
                          options={this.state.projectType}
                          isDisabled={isDisabled || details.SourceName === 'Jira'}
                          value={details.ProjectType === "" || details.ProjectType === null ? null : {
                            value: `${details.ProjectType}`,
                            label: `${details.ProjectType}`,
                          }}
                          name="ProjectType"
                          onChange={(data) =>
                            this.handleDropdownSelection(data, "ProjectType", index)
                          }
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["ProjectType"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Billing Type<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div>
                        <Select
                          name="BillingType"
                          options={this.state.billingType}
                          value={details.BillingType === "" || details.BillingType === null ? null : {
                            value: `${details.BillingType}`,
                            label: `${details.BillingType}`,
                          }}
                          isDisabled={isDisabled}
                          onChange={(data) =>
                            this.handleDropdownSelection(data, "BillingType", index)
                          }
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["BillingType"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Client Name </label>
                      <div className="input-outer">
                       
                        <DebounceInput
                      minLength={1}
                      value={details.ClientName && details.ClientName !== "" ? details.ClientName : ""}
                      disabled={isDisabled}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'ClientName', index)} />
                     
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Actual Start Date<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                        <DatePicker
                          className="input-date"
                          selected={details.ActualStartDate && details.ActualStartDate !== "" ? new Date(details.ActualStartDate) : null}
                          onChange={(date) =>
                            this.handeDateSelection(date, "ActualStartDate", index)
                          }
                          name="ActualStartDate"
                          disabled={isDisabled}
                          dateFormat="MMMM d, yyyy"
                          placeholderText={moment(new Date()).format(
                            "MMMM D, YYYY"
                          )}
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["ActualStartDate"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    
                  </div>
                  <div
                    className="row"
                    style={{ padding: ".5rem 1rem", paddingBottom: "8px" }}
                  >
                    <div className="col-md-2">
                      <label>Technical Lead </label>
                      <div className="input-outer">
                       
                        <DebounceInput
                      minLength={1}
                      value={details.TechicalLead && details.TechicalLead !== "" ? details.TechicalLead : ""}
                      disabled={isDisabled || details.SourceName === 'Jira'}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'TechicalLead', index)} />
                      
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>BU/Functional Lead </label>
                      <div className="input-outer">
                       
                         <DebounceInput
                      minLength={1}
                      value={details.BUFunctionalLead && details.BUFunctionalLead !== "" ? details.BUFunctionalLead : ""}
                      disabled={isDisabled || details.SourceName === 'Jira'}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'BUFunctionalLead', index)} />
                     
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Planned Effort (in person weeks)<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                      
                         <DebounceInput
                      type="number"
                      minLength={1}
                      className="input-inner"
                      value={details.PlannedEffort && details.PlannedEffort !== "" ? details.PlannedEffort : ""}
                      disabled={isDisabled}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'PlannedEffort', index)} />
                     
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["PlannedEffort"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Baseline Start Date<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                        <DatePicker
                          className="input-date"
                          selected={details.BaselineStartDate && details.BaselineStartDate !== "" ? new Date(details.BaselineStartDate) : null}
                          onChange={(date) =>
                            this.handeDateSelection(date, "BaselineStartDate", index)
                          }
                          name="BaselineStartDate"
                          disabled={isDisabled}
                          dateFormat="MMMM d, yyyy"
                          placeholderText={moment(new Date()).format(
                            "MMMM D, YYYY"
                          )}
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["BaselineStartDate"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Baseline End Date<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                        <DatePicker
                          className="input-date"
                          selected={details.BaselineEndDate && details.BaselineEndDate !== "" ? new Date(details.BaselineEndDate) : null}
                          onChange={(date) =>
                            this.handeDateSelection(date, "BaselineEndDate", index)
                          }
                          name="Baseline End Date"
                          disabled={isDisabled}
                          dateFormat="MMMM d, yyyy"
                          placeholderText={moment(new Date()).format(
                            "MMMM D, YYYY"
                          )}
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${ details.BaselineEndDate === null || details.BaselineEndDate === "" ? 'none' : new Date(details.BaselineEndDate) >= new Date(details.BaselineStartDate)
                              ? "none"
                              : "block"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        end date should be same or ahead of start date
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["BaselineEndDate"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>Actual End Date<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                        <DatePicker
                          className="input-date"
                          selected={details.ActualEndDate && details.ActualEndDate !== "" ? new Date(details.ActualEndDate) : null}
                          onChange={(date) =>
                            this.handeDateSelection(date, "ActualEndDate", index)
                          }
                          name="ActualEndDate"
                          disabled={isDisabled}
                          dateFormat="MMMM d, yyyy"
                          placeholderText={moment(new Date()).format(
                            "MMMM D, YYYY"
                          )}
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${ details.ActualEndDate === null || details.ActualEndDate === "" ? 'none' : new Date(details.ActualEndDate) >= new Date(details.ActualStartDate)
                              ? "none"
                              : "block"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        end date should be same or ahead of start date
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["ActualEndDate"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ padding: ".5rem 1rem", paddingBottom: "8px" }}
                  >
                    <div className="col-md-2">
                      <label>RFP Effort (in person weeks)<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="input-outer">
                      
                        <DebounceInput
                        type="number"
                      minLength={1}
                      className="input-inner"
                      value={details.BaselineResourceAllocation && details.BaselineResourceAllocation !== "" ? details.BaselineResourceAllocation : ""}
                      disabled={isDisabled}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'BaselineResourceAllocation', index)} />
                     
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["BaselineResourceAllocation"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label>P&amp;L BU<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div>
                        <Select
                          options={this.state.p_l_BU}
                          isDisabled={isDisabled}
                          name="PNLBU"
                          value={details.PNLBU === "" || details.PNLBU === null ? null : {
                            value: `${details.PNLBU}`,
                            label: `${details.PNLBU}`,
                          }}
                          onChange={(data) =>
                            this.handleDropdownSelection(data, "PNLBU", index)
                          }
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                          this.props.validateData["PNLBU"]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </div>
                    <div className="col-md-4" disabled>
                      <label>Project Description<span style={{color: 'red', margin:'0'}}>*</span></label>
                      <div className="text-area-div">
    
                       <DebounceInput
                       element="textarea"
                      minLength={1}
                      value={details.ProjectDescription && details.ProjectDescription !== "" ? details.ProjectDescription : ""}
                      disabled={isDisabled || details.SourceName === 'Jira'}
                      debounceTimeout={300}
                      style={{width:'100%', minHeight:'50px', borderRadius:'3px'}}
                      onChange={(event) => this.handleTextInput(event.target.value, 'ProjectDescription', index)} />

                      </div>
                      <div className="char-length">
                      <div
                        className="validate"
                        style={{
                          visibility: `${
                          this.props.validateData["ProjectDescription"]
                              ? "visible"
                              : "hidden"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                      <div className="text-counter">{details.ProjectDescription ? details.ProjectDescription.length : 0}/2000</div>
                      </div>
                      
                    </div>
                  </div>
                </div>
        ))}
        <div
          className="buttons"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="btn-save" onClick={this.handleEdit}>
            <button className="btn-inner">EDIT</button>
          </div>
          <div className="btn-save" onMouseEnter={this.checkRoute} onClick={this.checkRoute}>
              <button className="btn-inner" onClick={this.checkValidation} >
                NEXT
              </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rareData: state.projectReducer,
    validateData: state.validateReducer.projectData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    insertData: (data, name, id) =>
      dispatch({ type: "INSERTDATA", value: data, key: name, index: id }),
    validate: (value, key) => dispatch({type:'VALIDATEPROJECTDATA', value, key})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
