const initialState = [{
    ProjectID : "" ,
    ProjectName : "" ,
    ProjectDescription : "",
    ProjectType: "",
    ProjectCode: "",
    BillingType: "",
    ProjectManager: "" ,
    TechicalLead: "",
    BUFunctionalLead : "",
    PlannedEffort: "",
    BaselineStartDate: "" ,
    BaselineEndDate: "",
    ActualStartDate: "",
    ActualEndDate: "",
    BaselineResourceAllocation: "",
    PNLBU: "",
    ClientName: "",
    ResourceAllocated: ""
  }]
  
  

const rarelyReducer = (state = initialState, action) => {
    let newState = [...state];
    switch (action.type) {
        case "INSERTDATA":
            if(newState[action.index].recordStatus && newState[action.index].recordStatus === "db"){
                newState[action.index].recordStatus = "updated"
            }
            if(action.key === 'BaselineResourceAllocation'){
                newState[action.index][action.key] = action.value.toString();
                state = newState;
            } else {
                newState[action.index][action.key] = action.value;
                state = newState;
            }
            break;
        case "INSERTPROJECT":
            newState = [...action.data];
            state = newState;
            break;
        default:
            return state;
    }
    return state;
}

export default rarelyReducer;