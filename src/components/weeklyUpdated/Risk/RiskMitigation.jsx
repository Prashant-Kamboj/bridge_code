import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import {DebounceInput} from 'react-debounce-input'

class RiskMitgation extends Component {
  constructor(props) {
    super(props);
    this.state = {
     status: [  { value: "On Track", label: "On Track" },
     { value: "Possible Delay", label: "Possible Delay" },
     { value: "Delayed", label: "Delayed" },
     { value: "Completed", label: "Completed" },
     { value: "Yet to Start", label: "Yet to Start" },]
    };
  }

  componentDidMount(){
    let milestoneArr = this.props.riskData.map((data, index) => {
      return data.MilestoneName === "" ? {isMilestoneSelected : false} : {isMilestoneSelected: true}
    })
    this.setState({
      selectedMilestones: milestoneArr
    })
  }

  handleAddNextStep = (event) => {

    if(this.props.riskData[this.props.id].MilestoneName !== ""){
      this.props.addSteps(this.props.id);
    }
    else {
      this.props.checkMilestone(this.props.id, true)
    }
    this.props.addNextMitigation(this.props.id)
  };


  handleRemoveStep = (index) => {
    this.props.removeStep(this.props.id, index);
    const status = this.props.riskMitigation[index].recordStatus;
    this.props.removeRiskMitigation(this.props.id, index, status);
  };

  handleTextInput = (value, name, index, id) => {
    if(value.length === 0) {
      this.props.validate(true, name, id, index)
    }
    else {
      this.props.validate(false, name, id, index)
      if(name === "RiskMitigationSteps"){
        if(value.length === 501){
          return
        }
      }
    }
    this.props.addNextStep(
      value,
      name,
      index,
      this.props.id
    );
  };

  handeDateSelection = (date, name, index) => {
    if(date === "" || date === null) {
      this.props.validate(true,name,this.props.id,index);
    } else {
      this.props.validate(false,name, this.props.id, index);
    }

    const formatedDate = moment(date).format("YYYY-MM-DD");
    this.props.addNextStep(formatedDate, name, index, this.props.id);
  };

  handleDropdownSelection = (value, name, index) => {
    this.props.validate(false,name, this.props.id, index);
    this.props.addNextStep(value.value, name, index, this.props.id);
  }

  render() {
    return (
      <>
        <div className="risk-mitigation">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Risk Mitigation Next Steps{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Risk Mitigation Next Steps Owner{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Risk Mitigation Next Steps ETA{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
                <th scope="col">
                  Status{" "}
                  <span style={{ color: "red", margin: "0" }}>*</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.riskMitigation.map((risk, index) => (
                  risk.recordStatus !== "removed" ?  <tr key={index}>
                  <td style={{width:'400px'}}>
                    {" "}
                    <DebounceInput
                      element="textarea"
                      minLength={1}
                      value={risk.RiskMitigationSteps}
                      disabled={this.props.isDisabled}
                      debounceTimeout={300}
                      onChange={(event) =>
                        this.handleTextInput(event.target.value, 'RiskMitigationSteps', index, this.props.id)}
                      style={{width:'400px', maxWidth: '400px', minHeight:'37px', height:'37px' , borderRadius:'3px'}}
                     />
                      <div className="char-length">
                        <div style={{color:'red', visibility: `${this.props.riskNextStep[this.props.id][index]['RiskMitigationSteps'] ? 'visible' : 'hidden'}`}}>
                        field should not be empty
                      </div><div className="text-counter">{risk.RiskMitigationSteps.length}/500 </div></div>
                  </td>
                  <td>
                    {" "}
                    <div className="input-outer">
                     <DebounceInput
                      minLength={1}
                      value={risk.RiskMitigationStepsOwner}
                      disabled={this.props.isDisabled}
                      debounceTimeout={300}
                      onChange={(event) =>
                        this.handleTextInput(event.target.value, 'RiskMitigationStepsOwner', index, this.props.id)}
                     />
                    </div>
                    <div style={{color:'red', display: `${this.props.riskNextStep[this.props.id][index]['RiskMitigationStepsOwner'] ? 'block': 'none'}` }}>
                        field should not be empty
                      </div>
                  </td>
                  <td>
                    {" "}
                    <div className="input-outer">
                      <DatePicker
                        className="input-date"
                        name="RiskMitigationStepsETA"
                        disabled={this.props.isDisabled}
                        selected={
                          risk.RiskMitigationStepsETA &&
                          risk.RiskMitigationStepsETA !== ""
                            ? new Date(risk.RiskMitigationStepsETA)
                            : null
                        }
                        onChange={(date) =>
                          this.handeDateSelection(
                            date,
                            "RiskMitigationStepsETA",
                            index
                          )
                        }
                        dateFormat="MMMM d, yyyy"
                        placeholderText={moment(new Date()).format(
                          "MMMM D, YYYY"
                        )}
                      />
                    </div>
                    <div style={{color:'red', display: `${this.props.riskNextStep[this.props.id][index]['RiskMitigationStepsETA'] ? 'block': 'none'}` }}>
                        field should not be empty
                      </div>
                  </td>
                  <td style={{width:'250px'}}> 
                    <Select
                          name="RiskMitigationStatus"
                          options={this.state.status}
                          isDisabled={this.props.isDisabled}
                          value={
                            risk.RiskMitigationStatus === ""
                              ? null
                              : {
                                  value: `${risk.RiskMitigationStatus}`,
                                  label: `${risk.RiskMitigationStatus}`,
                                }
                          }
                          onChange={(value) =>
                            this.handleDropdownSelection(
                              value,
                              "RiskMitigationStatus",
                              index
                            )
                          }
                        />
                        <div style={{color:'red', display: `${this.props.riskNextStep[this.props.id][index]['RiskMitigationStatus'] ? 'block': 'none'}` }}>
                        field should not be empty
                      </div>
                        </td>
                  <td style={{ border: "none" }}>
                    {risk.recordStatus === "new" ?  <i
                      className="fa fa-times"
                      style={{
                        fontSize: "20px",
                        margin: "1rem",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => this.handleRemoveStep(index)}
                    /> : null}  
                  </td>
                </tr> : null
              )
              )}
            </tbody>
          </table>
          <div className="add-miti">
            <button
              id={this.props.id}
              className="add-mitigation"
              onClick={this.handleAddNextStep}
            >
              Add Next Step
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    riskData: state.riskReducer,
    riskNextStep: state.validateReducer.riskMitigation,
  };
};

const mapDispatchToPrps = (dispatch, ownProps) => {
  return {
    addSteps: (id) => dispatch({ type: "ADDNEXTSTEP", index: id }),
    addNext: () => dispatch({ type: "ADDNEXTSTEP" }),
    removeStep: (id, index) =>
      dispatch({ type: "REMOVESTEP", index: id, mitigationIndex: index}),
    addNextStep: (value, name, id, key) =>
      dispatch({
        type: "ADDNEXTRISKSTEP",
        value,
        key: name,
        index: id,
        riskId: key,
      }),
    validate: (value, name, riskNo, index) =>
      dispatch({ type: "VALIDATENEXTSTEP", value, riskNo, index, key: name }),
    addNextMitigation: (riskNo) =>
      dispatch({ type: "ADDNEXTMITIGATION", riskNo }),
    removeRiskMitigation: (riskNo, index, status) =>
      dispatch({ type: "REMOVEVALIDATESTEP", riskNo, index, status }),

  };
};

export default connect(mapStateToProps, mapDispatchToPrps)(RiskMitgation);
