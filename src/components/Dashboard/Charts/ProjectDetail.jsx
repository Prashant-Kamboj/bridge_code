import React, { PureComponent } from 'react';
import "./Table.css";
import '../Dashboard.css'

class ProjectDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { }
    };


    getChartData = () => {
        let ProjectData  = this.props.data;
        // console.log("Project detail:",ProjectData)
        return ProjectData;
    }

    render() { 
        this.getChartData();
        return ( 
            <div>

          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-responsive">PNLBU</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-responsive">Project Type</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-responsive">Client</div> </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 text-responsive">{this.props.data.length>0?this.props.data[0].PNLBU:"..."}</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 text-responsive">{this.props.data.length>0?this.props.data[0].ProjectType:"..."}</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 text-responsive">{this.props.data.length>0?this.props.data[0].ClientName:"..."}</div> </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-responsive">PNLBU/ Function Lead</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-responsive">Project Manager</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="text-xs font-weight-bold text-info text-uppercase mb-1 text-responsive">Tech Lead</div> </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 text-responsive">{this.props.data.length>0?this.props.data[0].BUFunctionalLead:"..."}</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 text-responsive">{this.props.data.length>0?this.props.data[0].ProjectManager:"..."}</div> </div>
                <div className="col-sm-4 col-md-4 col-lg-4">   <div className="h6 mb-0 mr-3 font-weight-bold text-gray-800 text-responsive">{this.props.data.length>0?this.props.data[0].TechicalLead:"..."}</div> </div>
              </div>
            </div>          
      
      </div>
        </div>
     
  );
    }
}
 
export default ProjectDetail;