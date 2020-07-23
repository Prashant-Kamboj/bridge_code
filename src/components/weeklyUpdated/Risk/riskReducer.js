const initialState = []


const dummyRisk = {
    MilestoneID:"",
    ProjectID: "",
    RiskID: "",
    RiskName: "",
    MilestoneName: "",
    RiskDescription: "",
    RiskImpactArea: "",
    RiskImpactScale: "",
    RiskProbabilityScale: "",
    RiskPlannedClosureDate: "",
    RiskStatus: "",
    RiskCategory: "",
    RiskMitigation: [],
    recordStatus: 'new'
  }

const dummyNextSteps = {
    RiskID: "",
    RiskMitigationID: "",
    RiskMitigationSteps: "",  
    RiskMitigationStepsOwner: "",
    RiskMitigationStatus: "",     
    RiskMitigationStepsETA: "",
    recordStatus:"new"
  }

const riskReducer = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'ADDNEXTSTEP':
            const newStep = JSON.parse(JSON.stringify(dummyNextSteps));
            if( newState[action.index].RiskMitigation.length > 0) {
                if(newState[action.index].recordStatus && newState[action.index].recordStatus === "db"){
                    newState[action.index].recordStatus = "updated"
                }
                newStep.RiskID = newState[action.index].RiskMitigation[newState[action.index].RiskMitigation.length - 1 ].RiskID;
                const mitigationId = newState[action.index].RiskMitigation[newState[action.index].RiskMitigation.length - 1 ].RiskMitigationID;
                newStep.RiskMitigationID = (parseInt(mitigationId, 10) + 1).toString();
                newState[action.index].RiskMitigation = [...newState[action.index].RiskMitigation, newStep];
                state = newState;
            } 
            else {
                if(newState[action.index].recordStatus && newState[action.index].recordStatus === "db"){
                    newState[action.index].recordStatus = "updated"
                }
                newStep.RiskID = newState[action.index].RiskID;
                newStep.RiskMitigationID = newState[action.index].RiskID + "01";
                newState[action.index].RiskMitigation = [...newState[action.index].RiskMitigation, newStep];
                state = newState;
            }
           
            break;
        case 'ADDRISK':
            const newRisk = JSON.parse(JSON.stringify(dummyRisk));
            newState = [...newState, newRisk];
            newRisk.ProjectID = action.projectId;
            state = newState;
            break;
        case 'REMOVESTEP':
            if(newState[action.index].RiskMitigation[action.mitigationIndex].recordStatus === "db"){
                newState[action.index].RiskMitigation[action.mitigationIndex].recordStatus = "removed"
            } else {
                newState[action.index].RiskMitigation.splice(action.mitigationIndex,1);
                newState[action.index].RiskMitigation =  [...newState[action.index].RiskMitigation];
            }
            state = newState;
            break;
        case 'REMOVERISK':
            if(newState[action.index].recordStatus === "new") {
                newState.splice(action.index,1);
                newState = [...newState];
                state = newState;
            } else {
                newState[action.index].recordStatus = "removed";
                newState = [...newState];
                state = newState;
            }
            break;
        case 'ADDNEXTRISKSTEP':
            newState[action.riskId].RiskMitigation[action.index][action.key] = action.value
            if(newState[action.riskId].recordStatus === "db"){
                newState[action.riskId].recordStatus = "updated"
            }
            state =  [...newState];
            break;
        case 'ISERTRISKDETAILS': 
             newState[action.index].MilestoneID = action.milestoneId;
             let riskId;
             if(newState.length === 1) {
                 riskId = action.milestoneId + "01"
             }
             else {
                 const copyState = JSON.parse(JSON.stringify(state));
                 const riskData = copyState.filter((data) => data.MilestoneID === action.milestoneId );
                 riskData.sort((a,b) => a.RiskID - b.RiskID);
                 if(riskData.length === 0) {
                    riskId = action.milestoneId + "01"
                 } else {
                    riskId = parseInt(riskData[riskData.length-1]['RiskID'], 10) + 1;  
                 }
                 riskId = riskId.toString();
                
             }
             newState[action.index].RiskID = riskId;
             if(newState[action.index].recordStatus && newState[action.index].recordStatus === "db"){
                 newState[action.index].recordStatus = "updated"
             }
             state = [...newState];
             break;
        case 'INSERTRISKDATA':
            if(newState[action.index].recordStatus && newState[action.index].recordStatus === "db"){
                newState[action.index].recordStatus = "updated"
            }
            newState[action.index][action.key] = action.value;
            state = [...newState];
            break;
        case 'INSERTRISK':
            newState = [...action.data];
            state = newState;
            break;
        default:
            return state;

    }
    return state;
}

export default riskReducer;