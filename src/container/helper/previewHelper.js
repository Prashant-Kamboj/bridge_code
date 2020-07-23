import {postProjectData, postMilestone, postRiskData, putMilestone, putRisk} from "../../service/services";

export const submitData = (postProject, postRisk, postMilestoneData, updateMilestone, updatedRisk, setProperty) => {
    if(postRisk.length > 0 && postMilestoneData.length > 0 && updateMilestone.length > 0 && updatedRisk.length > 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), postRiskData(postRisk), putMilestone(updateMilestone), putRisk(updatedRisk) ]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200 && response[3].status === 200 && response[4].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    } 
    if(postRisk.length > 0 && postMilestoneData.length === 0 && updateMilestone.length > 0 && updatedRisk.length > 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postRiskData(postRisk),  putMilestone(updateMilestone), putRisk(updatedRisk)]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200 && response[3].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    } 
    if(postRisk.length === 0 && postMilestoneData.length > 0 && updateMilestone.length > 0 && updatedRisk.length > 0 ) {
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), putMilestone(updateMilestone), putRisk(updatedRisk)]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200 && response[3].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      }) 
    }
    if(postMilestoneData.length > 0 && updateMilestone.length > 0 && updatedRisk.length === 0 && postRisk.length === 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), putMilestone(updateMilestone)]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length > 0 && postMilestoneData.length > 0 && updateMilestone.length > 0 && updatedRisk.length === 0) {
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), postRiskData(postRisk), putMilestone(updateMilestone)]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200 && response[3].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length > 0 && postMilestoneData.length > 0 && updateMilestone.length === 0 && updatedRisk.length > 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), postRiskData(postRisk), putRisk(updatedRisk) ]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200 && response[3].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length > 0 && postMilestoneData.length > 0 && updateMilestone.length === 0 && updatedRisk.length === 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), postRiskData(postRisk)]).then((response) => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length === 0 && postMilestoneData.length > 0 && updateMilestone.length === 0 && updatedRisk.length > 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData), putRisk(updatedRisk) ]).then(response => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length === 0 && postMilestoneData.length > 0 && updateMilestone.length === 0 && updatedRisk.length === 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postMilestone(postMilestoneData)]).then(response => {
        if(response[0].status === 200 && response[1].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length === 0 && postMilestoneData.length === 0 && updateMilestone.length > 0 && updatedRisk.length > 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), putMilestone(updateMilestone), putRisk(updatedRisk) ]).then(response => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length > 0 && postMilestoneData.length === 0 && updateMilestone.length > 0 && updatedRisk.length === 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), postRiskData(postRisk), putMilestone(updateMilestone)]).then(response => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length === 0 && postMilestoneData.length === 0 && updateMilestone.length > 0 && updatedRisk.length === 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), putMilestone(updateMilestone)]).then(response => {
        if(response[0].status === 200 && response[1].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length === 0 && postMilestoneData.length === 0 && updateMilestone.length === 0 && updatedRisk.length > 0){
      
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject), putRisk(updatedRisk)]).then(response => {
        if(response[0].status === 200 && response[1].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length > 0 && postMilestoneData.length === 0 && updateMilestone.length === 0 && updatedRisk.length === 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject),postRiskData(postRisk)]).then(response => {
        if(response[0].status === 200 && response[1].status === 200){
          setTimeout(() => {
              setProperty({
                isSubmitted: true
              })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if(postRisk.length > 0 && postMilestoneData.length === 0 && updateMilestone.length === 0 && updatedRisk.length > 0){
        setProperty({
            isLoading: true
          })
      Promise.all([postProjectData(postProject),  postRiskData(postRisk), putRisk(updatedRisk)]).then(response => {
        if(response[0].status === 200 && response[1].status === 200 && response[2].status === 200){
          setTimeout(() => {
            setProperty({
              isSubmitted: true
            })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }

    if( postRisk.length === 0 && postMilestoneData.length === 0 && updateMilestone.length === 0 && updatedRisk.length === 0) {
    //   this.setState({
    //     isLoading: true
    //   })
    setProperty({
        isLoading: true
      })
      Promise.all([postProjectData(postProject)]).then((response) => {
        if(response[0].status === 200){
          setTimeout(() => {
            setProperty({
              isSubmitted: true
            })
            window.location.href = "/PAI-InputTool"
          }, 400) 
        }
      })
    }
}