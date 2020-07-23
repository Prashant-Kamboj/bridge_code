import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import RiskMitigation from "./RiskMitigation";
import moment from 'moment';
import {DebounceInput} from 'react-debounce-input'

class RiskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riskCategory: [
        { value: "Resourcing", label: "Resourcing" },
        { value: "Third Party", label: "Third Party" },
        { value: "Client Dependency", label: "Client Dependency" },
        { value: "Quality", label: "Quality" },
        { value: "Scope Creep", label: "Scope Creep" },
        { value: "Infrastructure", label: "Infrastructure" },
        { value: "Invoicing/Revenue", label: "Invoicing/Revenue" },
      ],
      riskStatus:[
        {value:'Open',label:'Open'},
        {value:'Mitigatation Planned',label:'Mitigatation Planned'},
        {value:'Mitigatation Deployed',label:'Mitigatation Deployed'},
        {value:'Closed',label:'Closed'}
      ],
      riskImpactArea:[
        {value:'Cost/Resource',label:'Cost/Resource'},
        {value:'Schedule',label:'Schedule'},
        {value:'Scope',label:'Scope'}
      ],
      riskProbability:[
        {value:'Very low',label:'Very low'},
        {value:'Low',label:'Low'},
        {value:'Medium',label:'Medium'},
        {value:'High',label:'High'},
        {value:'Very High',label:'Very High'}
      ],
      isDisabled: true,
      isValidate: false,
      milestoneOptions: [],
      milestoneDisable: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { 
      isValidate: props.validate,
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.isValidate !== nextProps.isValidate){
  //     return true
  //   } return false
  // }

  handeDateSelection = (date, name, index) => {
   
    if(date === "" || date === null) {
      this.props.validate(true,name, index);
    } else {
      this.props.validate(false, name, index);
    }

    const formatedDate = moment(date).format("YYYY-MM-DD");
    this.props.insertRiskData(formatedDate, name, index);
  };

  handleDropdownSelection = (value, name, index) => {
    if(name === 'MilestoneName') {
      this.props.insertRiskDetails(index, value.id)
      let milestoneSelected = [...this.state.milestoneDisable];
      milestoneSelected[index] = true;
      this.setState({
        milestoneDisable: milestoneSelected
      })
    }
    this.props.validate(false, name, index);
    this.props.insertRiskData(value.value, name, index);
  };

  handleTextInput = (value, name, index) => {
    if(value === "") {
      this.props.validate(true, name, index)
    }
    else {
      this.props.validate(false, name, index)
      if(name === "RiskDescription"){
        if(value.length === 2001){
          return;
        }
      }
    }
   
    this.props.insertRiskData(value, name, index);
  };

  handleAddRisk = () => {
    this.props.addRisk(this.props.projectData.ProjectID);
    this.props.addVlidateRisk();
    this.props.addMitigation();
    let milestoneSelected = [...this.state.milestoneDisable]
    milestoneSelected.push(false);
  
    this.setState({
      milestoneDisable: milestoneSelected,
    })
    
  }

  handleRemoveRisk = (id) => {
    this.props.removeRisk(id);
    this.props.removeRiskValidate(id);
    this.props.changeEmptyField();
    this.state.milestoneDisable.splice(id, 1)
  }

  componentDidMount(){

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const milestoneOption = this.props.milestoneData.map((data) => { return {value: data.MilestoneName, label: data.MilestoneName, id: data.MilestoneID}});
    milestoneOption.unshift({value: 'No Association', label: 'No Association', id: `${this.props.projectData.ProjectID}000`})
    this.setState({
      milestoneOptions: milestoneOption
    })

   const selectedMilestones =  this.props.riskData.map((data) => true)
   this.setState({
    milestoneDisable: selectedMilestones
   })

  }

  render() {
    const {milestoneInfo} = this.props;
    return (
      <>
        {this.props.riskData.map((data, index) => (
          data.recordStatus !== "removed" && data.RiskStatus !== "Closed"? <div key={index}
          style={{
            margin: "2rem",
            padding: "2rem",
            backgroundColor: "#f3f7fa",
            position:'relative'
          }}
        >
          {data.recordStatus === "new"  ?  <div style={{position:'absolute', top:'0', left:'97%'}}><i
                      className="fa fa-times"
                      style={{
                        fontSize: "20px",
                        margin: "1rem",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => this.handleRemoveRisk(index)}
                    /></div> : null}
          <table className="table" key={index}>
            <thead>
              <tr>
                <th scope="col" style={{width:'280px'}}>Risk Name <span style={{color: 'red', margin:'0'}}>*</span></th>
                <th scope="col" style={{width:'200px'}}>Risk Type <span style={{color: 'red', margin:'0'}}>*</span></th>
                <th scope="col" style={{width:'200px'}}>Risk Impact Area <span style={{color: 'red', margin:'0'}}>*</span></th>
                <th scope="col" style={{width:'200px'}}>Risk Planned Closure Date <span style={{color: 'red', margin:'0'}}>*</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="input-outer">
                    <DebounceInput
                      minLength={1}
                      value={data.RiskName}
                      disabled={this.props.isDisabled}
                      debounceTimeout={300}
                      onChange={(event) => this.handleTextInput(event.target.value, 'RiskName', index)} />
                  </div>
                  <div style={{color:'red', display: `${this.props.validateRisk[index]['RiskName'] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
                <td>
                  <Select
                    name="RiskCategory"
                    options={this.state.riskCategory}
                    isDisabled={this.props.isDisabled}
                    value={data.RiskCategory === "" ? null : {
                      value: `${data.RiskCategory}`,
                      label: `${data.RiskCategory}`,
                    }}
                    onChange={(data) =>
                      this.handleDropdownSelection(data, "RiskCategory",index)
                    }
                  />
                   <div style={{color:'red', display: `${this.props.validateRisk[index]['RiskCategory'] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div> 
                </td>
                <td>
                  <Select
                    name="Risk_Impact_Area"
                    options={this.state.riskImpactArea}
                    isDisabled={this.props.isDisabled}
                    value={data.RiskImpactArea === "" ? null : {
                      value: `${data.RiskImpactArea}`,
                      label: `${data.RiskImpactArea}`,
                    }}
                    onChange={(data) =>
                      this.handleDropdownSelection(data, "RiskImpactArea",index)
                    }
                  />
                  <div style={{color:'red', display: `${this.props.validateRisk[index]['RiskImpactArea'] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
                <td>
                  {" "}
                  <div className="input-outer">
                    <DatePicker
                      className="input-date"
                      name="RiskPlannedClosureDate"
                      disabled={this.props.isDisabled}
                      selected={data.RiskPlannedClosureDate && data.RiskPlannedClosureDate !== "" ? new Date(data.RiskPlannedClosureDate) : null}
                      onChange={(date) =>
                            this.handeDateSelection(date, "RiskPlannedClosureDate", index)
                          }
                      dateFormat="MMMM d, yyyy"
                      placeholderText={moment(new Date()).format(
                        "MMMM D, YYYY"
                      )}
                    />
                  </div>
                  <div style={{color:'red', display: `${this.props.validateRisk[index]['RiskPlannedClosureDate'] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Risk Impact Scale <span style={{color: 'red', margin:'0'}}>*</span></th>
                <th scope="col">Risk Probability Scale <span style={{color: 'red', margin:'0'}}>*</span></th>
                <th scope="col" colSpan="2">
                  Risk Status <span style={{color: 'red', margin:'0'}}>*</span>
                </th>
                <th scope="col">Associated Milestone <span style={{color: 'red', margin:'0'}}>*</span></th>
                <th scope="col">Risk Description <span style={{color: 'red', margin:'0'}}>*</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Select
                    name="RiskImpactScale"
                    options={this.state.riskProbability}
                    isDisabled={this.props.isDisabled}
                    value={data.RiskImpactScale === "" ? null : {
                      value: `${data.RiskImpactScale}`,
                      label: `${data.RiskImpactScale}`,
                    }}
                    onChange={(data) =>
                      this.handleDropdownSelection(data, "RiskImpactScale", index)
                    }
                  />
                  <div style={{color:'red', display: `${this.props.validateRisk[index]['RiskImpactScale'] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
                <td>
                  <Select
                    name="RiskProbabilityScale"
                    options={this.state.riskProbability}
                    isDisabled={this.props.isDisabled}
                    value={data.RiskProbabilityScale === "" ? null : {
                      value: `${data.RiskProbabilityScale}`,
                      label: `${data.RiskProbabilityScale}`,
                    }}
                    onChange={(data) =>
                      this.handleDropdownSelection(data, "RiskProbabilityScale",index)
                    }
                  />
                  <div style={{color:'red', display: `${this.props.validateRisk[index]['RiskProbabilityScale'] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
                <td colSpan="2">
                  <Select
                    name="RiskStatus"
                    options={this.state.riskStatus}
                    isDisabled={this.props.isDisabled}
                    value={data.RiskStatus === "" ? null : {
                      value: `${data.RiskStatus}`,
                      label: `${data.RiskStatus}`,
                    }}
                    onChange={(data) =>
                      this.handleDropdownSelection(data, "RiskStatus",index)
                    }
                  />
                  <div style={{color:'red', display: `${this.props.validateRisk[index]["RiskStatus"] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
                <td>
                  <Select
                    name="AssociatedMilestone"
                    options={this.state.milestoneOptions}
                    isDisabled={data.MilestoneName !== "" ? true : this.props.isDisabled || this.state.milestoneDisable[index] }
                    value={data.MilestoneName === "" ? null : {
                      value: `${data.MilestoneName}`,
                      label: `${data.MilestoneName}`,
                      id: 123
                    }}
                    isFocused={false}
                    onChange={(data) =>
                      this.handleDropdownSelection(data, "MilestoneName",index)
                    }
                  />
                  <div style={{color:'red', display:`${milestoneInfo && data.MilestoneName === "" && milestoneInfo.index === index && milestoneInfo.isMilestoneSelected === true ? 'block': 'none'}`}}>Please select milestone</div>
                  <div style={{color:'red', display: `${this.props.validateRisk[index]["MilestoneName"] ? 'block' : 'none'}`}}>
                        field should not be empty
                      </div>
                </td>
                <td style={{width:'400px'}}>
                        <DebounceInput
                        element="textarea"
                      minLength={1}
                      value={data.RiskDescription}
                      disabled={this.props.isDisabled}
                      debounceTimeout={300}
                      style={{width:'100%', maxWidth: '400px', minHeight:'50px', borderRadius:'3px'}}
                      onChange={(event) => this.handleTextInput(event.target.value,'RiskDescription',index)} />
                        <div className="char-length">
                        <div style={{color:'red', visibility: `${this.props.validateRisk[index]['RiskDescription'] ? 'visible' : 'hidden'}`}}>
                        field should not be empty
                      </div><div className="text-counter">{data.RiskDescription.length}/2000 </div></div>
                        
                </td>
              </tr>
            </tbody>
          </table>
          <RiskMitigation id={index} riskMitigation={data.RiskMitigation} isDisabled={this.props.isDisabled} validate={this.state.isValidate} checkMilestone={this.props.checkMilestone}/>
        </div> : null
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: ".3rem",
          }}
        >
          <button onClick={this.handleAddRisk} className="add-btn">
            Add Risk
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    riskData: state.riskReducer,
    validateRisk: state.validateReducer.risk,
    milestoneData: state.milestoneReducer,
    projectData: state.projectReducer[0]
  };
};

const mapDispatchToPrps = (dispatch, ownProps) => {
  return {
    addSteps: () => dispatch({ type: "ADDNEXTSTEP" }),
    validate: (value, key, index) => dispatch({type:'VALIDATERISK', value, key, index}),
    addRisk: (projectId) => dispatch({ type: "ADDRISK", projectId }),
    addMitigation: () => dispatch({type: 'ADDVALIDATESTEP'}),
    addVlidateRisk: () => dispatch({type: 'ADDVALIDATERISK'}),
    removeRisk: (id) => dispatch({type:'REMOVERISK', index: id}),
    removeRiskValidate: (id) => dispatch({type:'REMOVERISKVALIDATE',index: id}),
    insertRiskData:(value, name, id) => dispatch({type:'INSERTRISKDATA', value, key:name, index: id}),
    insertRiskDetails: (index, milestoneId) => dispatch({type:'ISERTRISKDETAILS', index, milestoneId})
  };
};

export default connect(mapStateToProps, mapDispatchToPrps)(RiskTable);
