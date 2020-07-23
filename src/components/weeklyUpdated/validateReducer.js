const initialState = {
    projectData: {
        ProjectName: false,
        ProjectDescription : false,
        ProjectType: false,
        ProjectCode: false,
        BillingType: false,
        ProjectManager: false ,
        PlannedEffort: false,
        BaselineStartDate: false ,
        BaselineEndDate: false,
        ActualStartDate: false,
        ActualEndDate: false,
        BaselineResourceAllocation: false,
        PNLBU: false,
    },
    milestone: [],

    risk: [
   ],

    riskMitigation: []
}

const newMilestone = {
    MilestoneName: false,
    MilestoneSummary: false,
    MilestoneStatus: false,
    MilestonePlannedStartDate: false,
    MilestonePlannedEndDate: false
};

const newRisk = {
    RiskName: false,
    RiskDescription: false,
    RiskImpactArea: false,
    RiskImpactScale: false,
    RiskProbabilityScale: false,
    RiskPlannedClosureDate: false,
    RiskStatus: false,
    RiskCategory: false,
    } 

// const newMitigation = [{
//     RiskMitigationNextSteps: false,
//     RiskMitigationNextStepsOwner: false,        
//     RiskMitigationNextStepsETA: false,
//     RiskMitigationStatus: false
//   }];

const nextMitigation = {
    RiskMitigationSteps: false,
    RiskMitigationStepsOwner: false,        
    RiskMitigationStepsETA: false,
    RiskMitigationStatus: false
  }

const validateReducer = (state = initialState, action) => {
let newState = {...state};
    switch (action.type) {
        case 'VLIDATEMILESTONE':
            newState.milestone[action.index][action.key] = action.value;
            state = {...newState};
            break;
        case 'ADDMILE':
            const moreMile = JSON.parse(JSON.stringify(newMilestone));
            newState.milestone = [...newState.milestone, moreMile];
            state = {...newState};
            break;
        case 'REMOVEMILE':
            if(action.status === "new"){
             newState.milestone.splice(action.index, 1);
            }
            state = {...newState};
            break;
        case 'VALIDATERISK':
            newState.risk[action.index][action.key] = action.value;
            state = {...newState};
            break;
        case 'VALIDATENEXTSTEP':
            newState.riskMitigation[action.riskNo][action.index][action.key] = action.value;
            state = {...newState};
            break;
        case 'ADDVALIDATERISK' :
            const risk = JSON.parse(JSON.stringify(newRisk));
            newState.risk = [...newState.risk, risk];
            state = {...newState};
            break;
        case 'ADDVALIDATESTEP':
            newState.riskMitigation = [...newState.riskMitigation, []];
            state = {...newState};
            break;
        case 'ADDNEXTMITIGATION':
            const newStep = JSON.parse(JSON.stringify(nextMitigation));
            newState.riskMitigation[action.riskNo] = [...newState.riskMitigation[action.riskNo], newStep];
            state = {...newState};
            break;
        case 'REMOVEVALIDATESTEP' :
            if(action.status === "new") {
                newState.riskMitigation[action.riskNo].splice(action.index, 1);
            }
            state = {...newState}; 
            break;
        case 'INSERTMILESTONEVALIDATION':
            let validateMilestone = [];
            validateMilestone  = Array(action.milestoneLength).fill(newMilestone);
            newState.milestone = JSON.parse(JSON.stringify(validateMilestone));
            state = {...newState};
            break;
        case 'INSERTRISKVALIDATION':
            let riskValidation = [];
            riskValidation = Array(action.riskLength).fill(newRisk);
            newState.risk = JSON.parse(JSON.stringify(riskValidation));
            state = {...newState};
            break;
        case 'INSERMITIGATIONVALIDATION':
            let mitiVali = [];
            action.riskData.forEach((mitigation) => {
                let length = mitigation.length;
                mitiVali.push(JSON.parse(JSON.stringify(Array(length).fill(nextMitigation))));
            } )
            newState.riskMitigation = mitiVali;
            state = {...newState};
            break;
        case 'REMOVERISKVALIDATE':
            newState.risk.splice(action.index,1);
            newState.riskMitigation.splice(action.index, 1);
            state = {...newState};
            break;
        case 'VALIDATEPROJECTDATA':
            newState.projectData[action.key] = action.value;
            state = {...newState};
            break;
    
        default:
            return state;
    }
    return state;
}


export default validateReducer;