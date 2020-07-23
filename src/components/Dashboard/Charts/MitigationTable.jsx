import React, { Component } from 'react';

class MitigationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    };


    
    render() { 
    //  console.log("risk miti data",this.props.mitiData);

     return ( 
        <div>
           <table> 
            <tbody >
            {this.props.mitiData.length>0?this.props.mitiData.map((data, index) => (
                <>
                <tr>
                    <td className="text-left">{index+1}.{data.RiskMitigationSteps}</td>
                </tr>
                </>
            )):"N/A"}
            </tbody>
            </table>
        </div> 
        );
    }
}
 
export default MitigationTable;