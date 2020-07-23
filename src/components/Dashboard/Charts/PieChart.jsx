import React, { PureComponent } from 'react';
import Chart from 'react-google-charts';

class PieChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    getChartData = () => {
        let riskData  = this.props.data;

        let riskCategoryArr = riskData.map((risk) => risk.RiskCategory).filter((value, index, arr) => arr.indexOf(value) === index);
        let riskCategoryDetails = new Map();
        riskData.forEach((data) => {
            
            if(riskCategoryArr.includes(data.RiskCategory) && riskCategoryDetails.has(data.RiskCategory)){
                let riskCount= riskCategoryDetails.get(data.RiskCategory);
                riskCount += 1;
                riskCategoryDetails.set(data.RiskCategory,riskCount);
            } else {
                riskCategoryDetails.set(data.RiskCategory,1);
            }
        })

        let pieChartData  = [ ['Risk', 'Risk count']];

        for(let risk of riskCategoryDetails){
            pieChartData.push(risk);
        }

      //  console.log(pieChartData, 'piedata')
        return pieChartData;
    }
    
    render() { 
      
        return ( <div>
           <Chart
                width={'100%'}
                height={'240px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.getChartData()}
                options={{
                    title: 'Risk Category',
                    sliceVisibilityThreshold: 0.2, // 20%
                    is3D: true
                        }}
            rootProps={{ 'data-testid': '7' }}
            />
        </div> );
    }
}
 
export default PieChart;