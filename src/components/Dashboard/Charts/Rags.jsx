import React, { PureComponent } from 'react';
import '../Dashboard.css'

class Rags extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { }
        this.scheduleRag ='';
    };


    getChartData = () => {
        let riskData  = this.props.data;
      //  console.log("Risk All Data:",riskData);
       // console.log("Risk Data:",this.props.data[0].RiskImpactScale="High"?this.props.data[0].RiskImpactScale:null);
       let riskCategoryArr = riskData.map((data) => {
         if(data.RiskImpactArea === "Schedule"){
           if((data.RiskImpactScale="Low") && (data.RiskProbabilityScale="Low")){
             this.scheduleRag="btn-success";
           }
           else if((data.RiskImpactScale="High") && (data.RiskProbabilityScale="High")){
             this.scheduleRag="btn-warning";
           }
           else if(data.RiskImpactScale.length === 0){
             this.scheduleRag="btn-success";
           }
         }
       
     })
      // console.log("scheduleRag",scheduleRag);
       
        return riskData;
    }

    render() { 
        this.getChartData();
        return ( 
            <div>       
          <div className="panel panel-success">
            <div className="panel-heading text-center"><h4>PROJECT RAG</h4></div>
            <div className="panel-body">
         
          <div className="col-sm-4 col-md-4 col-lg-4">
                 <div className={this.scheduleRag+" btn btn-icon-split col-sm-12 col-md-12 col-lg-12 text-responsive"} style={{margin:"4px",font:"5vw"}}>
                 SCOPE  RAG
                 </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4" >
                <div className={this.scheduleRag+" btn btn-icon-split col-sm-12 col-md-12 col-lg-12 text-responsive"}  style={{margin:"4px"}}>
                  SCHEDULE RAG
                  </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4" >
                <div className={this.scheduleRag+" btn btn-icon-split col-sm-12 col-md-12 col-lg-12 text-responsive"} style={{margin:"4px"}}>
                  COST/EFFORT RAG
            
          </div>
          </div>
        </div>
        </div>
      
        </div>
     
  );
    }
}
 
export default Rags;