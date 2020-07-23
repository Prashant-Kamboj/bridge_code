import React, { Component } from 'react';
import axios from 'axios';
import PieChart from './Charts/PieChart';
import Timelines from './Charts/Timelines';
import MilestoneTable from './Charts/MilestoneTable';
import RiskMitigationTable from './Charts/RiskMitigationTable';
import ProjectDetail from './Charts/ProjectDetail';
import Rags from './Charts/Rags';
import Select from "react-select";
import Logo from '../../assets/BridgeLogo.png'
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './Dashboard.css'

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state ={
      riskData : [],
      milestoneData : [],
      projectData : [],
      projectName : "",
      projectId : "",
      projectOptions: [],
      allProjectData: [],
      projectSelected: {value: '', label:'', id: ''},
      showModal: false
    }
  }
  handleModal = () => {
    this.setState({
      showModal: false
    })
  }



  handleProjectData = (data, name, index) => {
    // console.log("data",data)
    this.props.setSelectedProject(data)
    this.setState({
      projectName: data.value,
      projectSelected: data
    })
    let projectId =  data.id
    // console.log("pid",projectId)
   
    axios.get(`https://bridgei2ipaibackendapp.azurewebsites.net/dataset/Risk/filter?ProjectID=${projectId}`).then((resp) => {
      this.setState({
        riskData : resp.data
      })
      // console.log("risk miti data app js",resp.data);
    })
    axios.get(`https://bridgei2ipaibackendapp.azurewebsites.net/dataset/milestone/filter?ProjectID=${projectId}`).then((resp) => {
      this.setState({
        milestoneData : resp.data
      })
    })
    axios.get(`https://bridgei2ipaibackendapp.azurewebsites.net/dataset/project/filter?ProjectID=${projectId}`).then((resp) => {
      this.setState({
        allProjectData : resp.data
      })
    })
  }
  componentDidMount(){
      if(this.props.projectSelected.value !== null){
       this.handleProjectData(this.props.projectSelected)
      }
      if(this.props.projectSelected.value === null){
        this.setState({
          showModal: true
        })
      }
    // //let projectId = this.state.projectSelected.id;
    this.props.handleDashboard();
    axios.get("https://bridgei2ipaibackendapp.azurewebsites.net/dataset/NameLookup/filter?KeyType=Project").then((resp) => {
     const projectData = resp.data.map((ele) => {return {value: ele.Name, label: ele.Name, id: ele.ID }});
    this.setState({
    projectOptions: projectData
  })
  })
  }
  
  render(){
    const {riskData,milestoneData,allProjectData} = this.state;
    //  console.log("all proj data:",allProjectData)
    // console.log('rd',riskData);
    return(   
   <div className="Dashboard" >
      <div className ="Container">
      <div className="row">

      <div id="mymodal" data-toggle="modal" data-target="#myModal"></div>
      <div className="modal" style={{display:`${this.state.showModal ? 'block':'none'}`}} id="myModal">
        <div className="modal-dialog" style={{backgroundColor:'white'}} role="document">
          <div className="modal_content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.handleModal}>&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Select a Project</h4>
            </div>
            <div className="modal-body">
            <div className="search-project" style={{ cursor: "pointer" }}>
              <Select
                style={{ cursor: "pointer" }}
                placeholder="Select Project"
                // isLoading={false}
                value={ this.state.projectName === "" ? null :  {
                  value: `${this.state.projectName}`,
                  label: `${this.state.projectName}`,
          }}
                onChange={(data) => this.handleProjectData(data, "ProjectName", 0) }
                name="ProjectName"
                options={this.state.projectOptions}
              />
            </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.handleModal}>Select</button>
            </div>
          </div>
        </div>
      </div>

      </div>
      <div className="row" style={{ backgroundColor: 'white'}}>
        <div className="col-sm-2 col-md-2 col-lg-2">
        <img src={Logo} alt="Bi2i" height="40%" width="40%"/>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
        <h1 className="dashboard-title">PROJECT DASHBOARD</h1>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
        <div className='row'>
        {" "}
        </div>
        <div className='row'>
        <div className="project-search text-responsive" style={{ cursor: "pointer", margin: '1rem', width:"100%" }}>
              <Select
                style={{ cursor: "pointer" }}
                placeholder="Select Project"
                // isLoading={false}
                value={ this.props.projectSelected ? this.props.projectSelected.value ? this.props.projectSelected : null : this.state.projectName === "" ? null :  {
                  value: `${this.state.projectName}`,
                  label: `${this.state.projectName}`,
          }}
                onChange={(data) => this.handleProjectData(data, "ProjectName", 0) }
                name="ProjectName"
                options={this.state.projectOptions}
              />
            </div>
          </div>
        </div>  
      </div>
      <div className="panel panel-primary" style={{marginBottom:'6px'}}></div>

      {/* go home btn */}
      <div className="action-btn" style={{marginBottom:'10px'}}>
      <Link to="/"><button className="homebutton text-responsive" onClick={this.props.goHome}>Go Home</button></Link>
      <Link to ="/PAI-InputTool"><button className="dashboardbutton text-responsive" onClick={() => this.props.handleShowInput()}>Go To InputTool</button></Link>
       </div>

      { this.state.projectName === "" ? null : <>
      <div className="row">
      <div className="col-sm-6 col-md-6 col-lg-6">
      <ProjectDetail data={allProjectData} />
      </div>
      <div className="col-sm-6 col-md-6 col-lg-6">
          <Rags data={riskData}/>
        </div>
      </div>

      <div className = "row">
        <div className="col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-success">
        <div className="panel-heading">Milestone Timelines</div>
          <div className="panel-body">
            <Timelines data={milestoneData} />
            <MilestoneTable data={milestoneData} />
            </div>
        </div>
        </div>
        
        <div className="col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-success">
            <div className="panel-heading">Project Risks</div>
            <div className="panel-body">
            <PieChart data={riskData}/>
            <RiskMitigationTable data={riskData}/>
            </div>
          </div>
        </div>

      </div> 
      </>}     
    </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        projectSelected: state.mainReducer.selectedProject
    }
}

const mapDispatchToProps = (dispatch) => {
   return{ setSelectedProject: (projectData) => dispatch({type:'SETPROJECTDATA', data: projectData}) }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
