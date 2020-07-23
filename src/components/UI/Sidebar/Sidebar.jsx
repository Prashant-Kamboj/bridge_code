import React , {Component} from 'react';
import './Sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="side-bar">
                <ul>
                    <li>Project Details</li>
                    <li>Milestone</li>
                    <li>Risk</li>
                    <li>Risk Mitegation</li>
                </ul>
            </div>
         );
    }
}
 
export default Sidebar;