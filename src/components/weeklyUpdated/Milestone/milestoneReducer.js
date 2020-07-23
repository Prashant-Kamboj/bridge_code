import moment from 'moment';
const initialState=[]

const sampleData = {
    MilestoneID: "",
    ProjectID:"",
    MilestoneName: "",
    MilestoneSummary:"",
    MilestoneStatus: "",
    MilestonePlannedStartDate: "",
    MilestonePlannedEndDate: "",
    StatusDatePeriod: "",
    recordStatus: "new"
 }

const milestoneReducer = (state=initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "ADDMORE":
            let milestoneId;
            let newData = JSON.parse(JSON.stringify(sampleData));
            if(newState.length === 0) {
                milestoneId = action.projectId + "001"
            }
            else {
                milestoneId = parseInt(newState[newState.length-1]['MilestoneID'], 10) + 1;
            }
            newData['ProjectID'] = action.projectId;
            newData['MilestoneID'] = milestoneId.toString();
            newData['StatusDatePeriod'] = moment(new Date()).format('YYYY-MM-DD').toString();
            newState = [...newState, newData ];
            state = newState;
            break;
        case 'REMOVEMILESTONE':
            if(newState[action.index].recordStatus === "new"){
                newState.splice(action.index,1);
                newState = [...newState];
                state = newState;
            } else {
                newState[action.index].recordStatus = "removed"
                newState = [...newState];
                state = newState;
            }
            break;
        case 'INSERTMILESTONEDATA':
            newState[action.index][action.key] = action.value;
            newState[action.index]['StatusDatePeriod'] = moment(new Date()).format('YYYY-MM-DD').toString();
            if(newState[action.index].recordStatus !== 'new') {
                newState[action.index].recordStatus = 'updated'
            }
            state = [...newState];
            break;
        case 'INSERTMILESTONE':
            const mileData = action.data.map((data) => {return {...data, recordStatus: "db"}})
            newState = [...mileData];
            state = [...newState];
            break;
        default:
            return state;
    }
    return state;
}

export default milestoneReducer;