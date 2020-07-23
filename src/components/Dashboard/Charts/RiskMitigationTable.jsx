import React, { Component } from 'react';
import MitigationTable from './MitigationTable';

class RiskMitigationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    };
    
    render() { 
    //  console.log("risk miti data",this.props.data);

     return ( 
        <div class="table-responsive">
           <table className="table risk-table" >
            <thead className="table-fixed-block">
                <tr>
                <th className="text-center" style={{width:'12.5%'}}>Risks</th>
                <th className="text-center" style={{width:'12.5%'}}>Milestone</th>
                <th className="text-center" style={{width:'20%'}}>Description</th>
                <th className="text-center" style={{width:'25%'}}>Closure</th>
                <th className="text-center" style={{width:'5%'}}>Status</th>    
                <th className="text-center" style={{width:'25%'}}>Mitigations</th>
                </tr>
            </thead>
            <tbody className="table-fixed-block table-fixed-body">
            {this.props.data.length>0?this.props.data.map((data, index) => (
                <>
                <tr>
                <td style={{width:'7.5%'}}>{data.RiskName}</td>
                <td style={{width:'7.5%'}}>{data.MilestoneName}</td>
                <td style={{width:'30%'}}>{data.RiskDescription}</td>
                <td style={{width:'25%'}}>{data.RiskPlannedClosureDate}</td>
                <td style={{width:'5%'}}>{data.RiskStatus}</td>
                <td style={{width:'25%'}}><MitigationTable mitiData={data.RiskMitigation}/></td>
                </tr>
                </>
            )):null}
            </tbody>
            </table>
        </div> 
        );
    }
}
 
export default RiskMitigationTable;