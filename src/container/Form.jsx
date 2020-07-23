import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div stye={{display: 'flex'}} >
                <div className="sidebar" style={{flex:'3', width:'200px'}}>
                    <h1>Hello</h1>
                </div>
                <div className="content" style={{flex:'9', width:'400px'}}>
                    <h2>Contnet</h2>
                    <section>Write...</section>
                </div>
            </div>
        )
    }
}
 
export default Form;