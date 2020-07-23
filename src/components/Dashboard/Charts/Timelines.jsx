import React, { PureComponent } from 'react';
import Chart from 'react-google-charts';

class Timelines extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    };


    getChartData = () => {
        let milestoneData  = this.props.data;
        // console.log("mile timeline:",milestoneData)
        let TimelinesData  = [
            [
             { type: 'string', id: 'Term' },
             { type: 'string', id: 'Milestone' },
             { type: 'date', id: 'Start' },
             { type: 'date', id: 'End' },
              ]
            ];

            let milestoneTimelinesDetails = milestoneData.map((data,index) => {                
                return [(index+1).toString(),data.MilestoneName,new Date(data.MilestonePlannedStartDate), new Date(data.MilestonePlannedEndDate)]            
            });
           const timelinechartData = [...TimelinesData,...milestoneTimelinesDetails];
        return timelinechartData;
    }
    
    render() { 
      this.getChartData();
        return ( 
        <div>
            <Chart
                width={'100%'}
                height={'240px'}
                chartType="Timeline"
                fontSize= "2px"
                loader={<div>Loading Chart</div>}
                data={this.getChartData()}
                rootProps={{ 'data-testid': '2' }}
            />
        </div> );
    }
}
 
export default Timelines;