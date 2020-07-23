import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import Select from "react-select";
import "./Milestone.css";
import moment from "moment";
import {DebounceInput} from 'react-debounce-input'

class Milestone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milestoneStatus: [
        { value: "On Track", label: "On Track" },
        { value: "Possible Delay", label: "Possible Delay" },
        { value: "Delayed", label: "Delayed" },
        { value: "Completed", label: "Completed" },
        { value: "Yet to Start", label: "Yet to Start" },
      ],
      isDisabled: true,
      isValidated: false,
      isEmpty: false,
      isCorrect: false,
    };
  }

  handleRemove = (event, index) => {
    this.props.remove(event.target.id);
    const recStatus = this.props.milestoneData[index].recordStatus
    this.props.removeMilestone(index, recStatus);
  };

  handleEdit = () => {
    this.setState({
      isDisabled: false,
    });
  };

  handeDateSelection = (date, name, index) => {
    if(date === "" || date === null) {
      this.props.validate(true, index, name);
    } else {
      this.props.validate(false, index, name);
     
    }
    const formatedDate = moment(date).format("YYYY-MM-DD");
    this.props.insertData(formatedDate, name, index);
  };

  handleDropdownSelection = (value, name, index) => {
    if(value.value === "") {
      this.props.validate(true, index, name);
    } else {
      this.props.validate(false, index, name);
    }
    this.props.insertData(value.value, name, index);
  };

  handleTextInput = (value, name, index) => {

    if (value.length === 0) {
      this.props.validate(true, index, name);
    } else {
      this.props.validate(false, index, name);
      if(name === "MilestoneSummary"){
        if(value.length === 501){
          return;
        }
      }
    }
    this.props.insertData(value, name, index);
  };

  handleResourceAllocation = (value, name) => {

    if (value.length === 0 ) {
      this.setState({
        isEmpty: true,
      });
    } 
     else {
      this.setState({
        isEmpty: false,
      });
    }
    // if (!Number(value) && value !== "") {
    //   return;
    // }
    this.props.insertResourcer(value, name, 0);
  };

  handleValidation = () => {
    this.props.next();
  };

  handleAddMore = () => {
    this.props.addValidate();
    this.props.addMore(this.props.projectData[0].ProjectID);
  };

  checkRoute = () => {
    const exclude = [ 'MilestoneID', 'ProjectID', 'ProjectName', 'StatusDatePeriod']

    const resource = this.props.projectData[0].ResourceAllocated;
    const milestone = this.props.milestoneData;
    let emptyFieldCount  = 0;

    milestone.forEach((data, index) => {
      Object.keys(data).forEach((key) => {
        if(exclude.includes(key) === false && data['recordStatus'] !== 'removed') {
          if(data[key] === ""){
            emptyFieldCount++;   
          }
        } 
      })
    })

    if(emptyFieldCount > 0 && resource === "") {
      this.setState({
        isCorrect: false
      })
    }
    if(emptyFieldCount !== 0) {
      this.setState({
        isCorrect: false
      })
    }
    if(resource === "") {
      this.setState({
        isCorrect: false
      })
    }
    if(emptyFieldCount === 0 && resource !== "") {
      this.setState({
        isCorrect: true
      })
    }
  }

  checkValidation = () => {
    const exclude = [ 'MilestoneID', 'ProjectID', 'ProjectName', 'StatusDatePeriod']
    const resource = this.props.projectData[0].ResourceAllocated;
    const milestone = this.props.milestoneData;
    let emptyFieldCount  = 0;

    milestone.forEach((data, index) => {
      Object.keys(data).forEach((key) => {
        if(exclude.includes(key) === false && data['recordStatus'] !== 'removed') {
          if(data[key] === ""){
            emptyFieldCount++;
            this.props.validate(true, index, key);     
          }
        } 
      })

    })

    if(emptyFieldCount > 0 && resource === "") {
      this.setState({
        isValidated: false
      })
    }

    if(emptyFieldCount !== 0) {
      this.setState({
        isValidated: false
      })
    }

    if(resource === "") {
      this.setState({
        isValidated: false,
        isEmpty: true
      })
    }

    if(emptyFieldCount === 0 && resource !== "") {
      this.setState({
        isValidated: true
      })
    }
    if(this.state.isCorrect){
      this.props.next()
    }
  }

  componentDidMount(){
    this.props.current();
  }

  render() {
    return (
      <div>
        <div
          style={{
            padding: "3rem",
            backgroundColor: "#f3f7fa",
            margin: "3rem",
            marginTop: '1rem'
          }}
          className="hidden-xs"
        >
          <div className="resourcer-outer">
            <div className="resourcer-minestone">
              <label>
                Resource Allocated in reporting period(In person weeks)
                <span style={{ color: "red", margin: "0" }}>*</span>
              </label>
              <div
                className="input-outer"
                style={{ width: "40%", marginLeft: "27%" }}
              >
                 <DebounceInput
                      type="number"
                      minLength={1}
                      className="input-inner"
                      placeholder="Resource Allocated"
                      value={this.props.projectData[0]['ResourceAllocated']}
                      disabled={this.state.isDisabled}
                      debounceTimeout={300}
                      onChange={(event) => this.handleResourceAllocation(event.target.value, 'ResourceAllocated' )} />
              </div>
              <div
                className="validate"
                style={{ display: `${this.state.isEmpty ? "block" : "none"}` }}
              >
                field should not be empty
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Milestone Name{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Milestone Summary{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Milestone Status{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Milestone Planned Start Date{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Milestone Planned End Date{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.milestoneData.map((data, index) =>
                data.recordStatus !== "removed" && data.MilestoneStatus !== "Completed"? (
                  <tr key={index}>
                    <td>
                      <div className="input-outer">
                       
                      <DebounceInput
                      minLength={1}
                      value={data.MilestoneName}
                      disabled={this.state.isDisabled || data.SourceName === 'Jira'}
                      debounceTimeout={300}
                      onChange={(event) =>
                        this.handleTextInput(event.target.value,'MilestoneName', index)
                      } />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                            data.recordStatus !== "removed" ? this.props.validateMilestone[index]["MilestoneName"]
                              ? "block"
                              : "none" : 'none'
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </td>
                    <td style={{ width: "200px" }}>
                       <DebounceInput
                       element = "textarea"
                      minLength={1}
                      value={data.MilestoneSummary}
                      disabled={this.state.isDisabled || data.SourceName === 'Jira'}
                      debounceTimeout={300}
                      style={{
                        width: "250px",
                        maxWidth:'250px',
                        height: "37px",
                        minHeight:'37px',
                        borderRadius: "3px",
                      }}
                      onChange={(event) =>
                        this.handleTextInput(event.target.value,'MilestoneSummary', index)
                      } />
                      <div className="char-length">
                      <div
                        className="validate"
                        style={{
                          visibility: `${
                            this.props.validateMilestone[index][
                              "MilestoneSummary"
                            ]
                              ? "visible"
                              : "hidden"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                       <div className="text-counter">{data.MilestoneSummary.length}/500</div>
                        </div>
                      
                    </td>
                    <td>
                      <div style={{ minWidth: "160px" }}>
                        <Select
                          name="MilestoneStatus"
                          options={this.state.milestoneStatus}
                          isDisabled={this.state.isDisabled || data.SourceName === 'Jira'}
                          value={
                            data.MilestoneStatus === ""
                              ? null
                              : {
                                  value: `${data.MilestoneStatus}`,
                                  label: `${data.MilestoneStatus}`,
                                }
                          }
                          onChange={(value) =>
                            this.handleDropdownSelection(
                              value,
                              "MilestoneStatus",
                              index
                            )
                          }
                        />
                      </div>
                       <div
                        className="validate"
                        style={{
                          display: `${
                             this.props.validateMilestone[index][
                              "MilestoneStatus"
                            ]
                              ? "block"
                              : "none"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div> 
                    </td>
                    <td>
                      <div className="input-outer">
                        <DatePicker
                          className="input-date"
                          selected={
                            data.MilestonePlannedStartDate &&
                            data.MilestonePlannedStartDate !== ""
                              ? new Date(data.MilestonePlannedStartDate)
                              : null
                          }
                          name="MilestonePlannedStartDate"
                          disabled={this.state.isDisabled || data.SourceName === 'Jira'}
                          onChange={(date) =>
                            this.handeDateSelection(
                              date,
                              "MilestonePlannedStartDate",
                              index
                            )
                          }
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
                            data.recordStatus !== "removed" ? this.props.validateMilestone[index][
                              "MilestonePlannedStartDate"
                            ]
                              ? "block"
                              : "none" : 'none'
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                    </td>
                    <td>
                      <div className="input-outer">
                        <DatePicker
                          className="input-date"
                          selected={
                            data.MilestonePlannedEndDate &&
                            data.MilestonePlannedEndDate !== ""
                              ? new Date(data.MilestonePlannedEndDate)
                              : null
                          }
                          name="MilestonePlannedEndDate"
                          disabled={this.state.isDisabled || data.SourceName === 'Jira'}
                          onChange={(date) =>
                            this.handeDateSelection(
                              date,
                              "MilestonePlannedEndDate",
                              index
                            )
                          }
                          dateFormat="MMMM d, yyyy"
                          placeholderText={moment(new Date()).format(
                            "MMMM D, yyyy"
                          )}
                        />
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                            data.recordStatus !== "removed" ? this.props.validateMilestone[index][
                              "MilestonePlannedEndDate"
                            ]
                              ? "block"
                              : "none" : 'none'
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        field should not be empty
                      </div>
                      <div
                        className="validate"
                        style={{
                          display: `${
                            this.props.milestoneData[index]['MilestonePlannedEndDate'] === ""  ? "none" : this.props.milestoneData[index]['MilestonePlannedStartDate'] === "" ? 'none' :
                           new Date(this.props.milestoneData[index]['MilestonePlannedEndDate']) >= new Date(this.props.milestoneData[index]['MilestonePlannedStartDate'])
                              ? "none"
                              : "block"
                          }`,
                          marginLeft: "0",
                        }}
                      >
                        end date should be same or ahead of start date
                      </div>
                    </td>
                    <td style={{ border: "none" }}>
                      {data.recordStatus === "new" ?  <i
                        className="fa fa-times"
                        style={{
                          fontSize: "26px",
                          margin: "0rem",
                          paddingTop: "0.5rem",
                          cursor: "pointer",
                          color: "red",
                        }}
                        id={index}
                        onClick={(event) => this.handleRemove(event, index)}
                      /> : null}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={() => this.handleAddMore()} className="add-btn">
              Add Milestone
            </button>
          </div>
        </div>

        <div
          className="buttons"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="btn-save">
              <button className="btn-inner" onClick={() => this.props.back()}>
                BACK
              </button>
          </div>
          <div className="btn-save">
            <button className="btn-inner" onClick={this.handleEdit}>
              EDIT
            </button>
          </div>
          <div className="btn-save" onMouseEnter={this.checkRoute} >
              <button
                className="btn-inner"
                onClick={this.checkValidation}
              >
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
    milestoneData: state.milestoneReducer,
    projectData: state.projectReducer,
    validateMilestone: state.validateReducer.milestone,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMore: (projectId) => dispatch({ type: "ADDMORE", projectId }),
    addValidate: () => dispatch({ type: "ADDMILE" }),
    validate: (value, index, key) =>
      dispatch({ type: "VLIDATEMILESTONE", value, index, key }),
    removeMilestone: (id, status) => dispatch({type:'REMOVEMILE', index: id, status}),
    remove: (id) => dispatch({ type: "REMOVEMILESTONE", index: id }),
    insertData: (value, name, id) =>
      dispatch({ type: "INSERTMILESTONEDATA", value, key: name, index: id }),
    insertResourcer: (data, name, id) =>
      dispatch({ type: "INSERTDATA", value: data, key: name, index: id }),
    insertMilestone: (data) => dispatch({ type: 'INSERTMILESTONE', data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Milestone);
