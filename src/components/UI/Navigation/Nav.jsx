import React, {Component} from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
          }
    }

    render() { 
        const { isProjectSelected, isMilestoneSelected, isRiskSelected } = this.props
        return ( 
            <div className='navbar hidden-xs'>
            <ul className="navbar-nav">
              <li className={isProjectSelected ? 'nav-active': 'unactive'} >
              <p>Project Details</p>
              </li>
              <li className={isMilestoneSelected ? 'nav-active': 'unactive'}>
               <p>Milestone</p>
              </li>
              <li className={isRiskSelected ? 'nav-active': 'unactive'}>
                <p>Risk</p>
              </li>
            </ul>
          </div>
         );
    }
}
 
export default Nav;