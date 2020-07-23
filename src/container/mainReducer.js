const initialState = {
    isProjectSelected: false,
    isPreviewSelected: false,
    showFeedback: false,
    selectedProject: {value:null, label:null, id: null}
}

const mainReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case "SELECTPROJECT":
            newState.isProjectSelected = true;
            state = {...newState}
            break;
        case "PREVIEWSHOW":
            newState.isPreviewSelected = true;
            state = {...newState};
            break;
        case "PREVIEWHIDE":
            newState.isPreviewSelected = false;
            state = {...newState};
            break;
        case "SHOWFEEDBACK":
            newState.showFeedback = true;
            state = {...newState};
            break;
        case "HIDEFEEDBACK":
            newState.showFeedback = false;
            state = {...newState};
            break;
        case "SETPROJECTDATA":
            newState.selectedProject.value =  action.data.value;
            newState.selectedProject.label =  action.data.label;
            newState.selectedProject.id =  action.data.id;
            state = {...newState}
            break;
        default:
            return state;
    }
    return state;
}

export default mainReducer;