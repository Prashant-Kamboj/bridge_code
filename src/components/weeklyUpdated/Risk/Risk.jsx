import React, {Component} from 'react';
import RiskTable from './RiskTable';
import {connect} from 'react-redux';
import "./Risk.css"
import Preview from '../../../container/Preview';

class Risk extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isDisabled: true,
            emptField: 0,
            selectedMilestone : null,
            isCorrect: false,
            isComplete: true
         }
    }

    handleEdit = () => {
        this.setState({
            isDisabled: false,
            isCorrect: false,
        })
    }

    checkMilestoneSelected = (id, value) => {
      this.setState({
        selectedMilestone: {index: id, isMilestoneSelected: value }
      })
    }

    checkRoute = () => {
        const exclude = [ 'MilestoneID', 'RiskID', 'RiskMitigationID']
        const risk = this.props.riskData;
        let emptyFieldCount  = 0;
    
        risk.forEach((data, index) => {
            Object.keys(data).forEach((key) => {
              if(exclude.includes(key) === false && data['recordStatus'] !== 'removed') {
                  if(key === 'RiskMitigation') {
                      data['RiskMitigation'].forEach((mitigation) => { 
                          Object.keys(mitigation).forEach((key, ind) => {
                          if(mitigation[key] === "" && exclude.includes(key) === false) {
                              emptyFieldCount++;
                          }
                      })}) 
                  } else {
              
                if(data[key] === ""){
                  emptyFieldCount++;  
                }
                  }         
              } 
            })
          })
      
        if(emptyFieldCount > 0) {
          this.setState({
            isCorrect: false,
            isValidated: true
          })
        }
        if(emptyFieldCount === 0) {
          this.setState({
            isCorrect: true,
            isValidated: false,
          })
        }
      }

      checkValidation = () => {
        const exclude = [ 'MilestoneID', 'RiskID', 'RiskMitigationID']
       
        const risk = this.props.riskData;
        let emptyFieldCount  = 0;
    
        risk.forEach((data, index) => {
          Object.keys(data).forEach((key) => {
            if(exclude.includes(key) === false && data['recordStatus'] !== 'removed') {
                if(key === 'RiskMitigation') {
                    data['RiskMitigation'].forEach((mitigation, indc) => { 
                        Object.keys(mitigation).forEach((key) => {
                        if(mitigation[key] === "" && exclude.includes(key) === false) {
                            emptyFieldCount++;
                            this.props.validateNextStep(true, index, indc, key);
                        }
                    })}) 
                } else {
              
              if(data[key] === ""){
                emptyFieldCount++;  
                this.props.validate(true, index, key); 
              }
                }         
            } 
          })
        })
    
       
        if(emptyFieldCount > 0) {
          this.setState({
            emptField: emptyFieldCount,
            isComplete: false
          })
        }
        if(emptyFieldCount === 0) {
          this.setState({
            emptField: emptyFieldCount,
            isComplete: true 
          })
          this.props.preview();
        }
        // if(this.state.isCorrect) {
           
        // }
      }
    componentDidMount(){
     this.props.current();
    }

    changeEmptyField = () => {
      this.setState({
        emptField: 0,
        selectedMilestone: null
      })
    }

    render() { 
        return ( 
          <>{ this.props.isPreviewSelected ? <Preview /> :   <div>
            <RiskTable isDisabled={this.state.isDisabled} edit={this.handleEdit} validate={this.state.emptField} checkMilestone={this.checkMilestoneSelected} milestoneInfo={this.state.selectedMilestone} changeEmptyField={this.changeEmptyField}/>
            <div className="buttons" style={{display:'flex', justifyContent:'center',marginTop:'24px'}}>
            <div className="btn-save">
            <button className="btn-inner" onClick={() => this.props.back()}>BACK</button>
            </div>
            <div className="btn-save">
            <button className="btn-inner" onClick={this.handleEdit}>EDIT</button>
            </div>
            <div className="btn-save" onMouseEnter={this.checkRoute}>
            <button className="btn-inner" onClick={this.checkValidation}>PREVIEW</button>
            </div>
    </div>
    
       </div>}
         
        </>
         );
    }
}
 
const mapStateToProps = (state, ownProps) => {
    return {
        riskData: state.riskReducer,
        riskValidate: state.validateReducer.risk,
        mitigationValidate: state.validateReducer.riskMitigation,
        isPreviewSelected: state.mainReducer.isPreviewSelected,
        projectData: state.projectReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        validate: (value, index, key) => dispatch({type:'VALIDATERISK', value, index, key}),
        validateNextStep: (value, riskNo, index, key) => dispatch({type: 'VALIDATENEXTSTEP', value, riskNo, index, key}),
        preview: () => dispatch({type:'PREVIEWSHOW'}),
        insertRisk: (data) => dispatch({type: 'INSERTRISK', data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Risk);