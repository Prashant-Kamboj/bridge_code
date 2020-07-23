import React, { Component } from 'react';
import "./Table.css";

class MilestoneTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    };
    
    render() { 

        
        return ( 
        <div class="table milestone-table">
           <table className="table  milestone-table" >
            <thead className="table-fixed-block">
                <tr>
                <th className="text-center" scope="col" style={{width:'10%'}}>Milestones</th>
                <th className="text-center" scope="col" style={{width:'25%'}}>Summary</th>
                <th className="text-center" scope="col" style={{width:'20%'}}>Start Date</th>
                <th className="text-center" scope="col" style={{width:'20%'}}>End Date</th>
                <th className="text-center" scope="col" style={{width:'25%'}}>Status</th>
                </tr>
            </thead>
            <tbody className="table-fixed-block table-fixed-body">
            {this.props.data.length>0?this.props.data.map((data, index) => (
                <>
                <tr>
                <td style={{width:'10%'}}>{data.MilestoneName }</td>
                <td style={{width:'30%'}}>{data.MilestoneSummary}</td>
                <td style={{width:'20%'}}>{data.MilestonePlannedStartDate}</td>
                <td style={{width:'20%'}}>{data.MilestonePlannedEndDate}</td>
                <td style={{width:'20%'}}>{data.MilestoneStatus}</td>
                </tr>
                </>
            )):null}
            </tbody>
            </table>
        </div> 
        );
    }
}
 
export default MilestoneTable;