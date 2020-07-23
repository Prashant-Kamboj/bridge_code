import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import './Loginbygoogle.css'
import Logo from '../assets/BridgeLogo.png'

export class Logintbygoogle extends Component {

  constructor(props) {

    super(props);
    this.state = {
    };
    // this.signup = this
    //   .signup
    //   .bind(this);
  }

  signup(res) {

    const googleresponse = {

      Name: res.profileObj.name,
      email: res.profileObj.email,
      token: res.googleId,
      Image: res.profileObj.imageUrl,
      ProviderId: 'Google'
    };

    debugger;

    axios.post('http://localhost:60200/Api/Login/SocialmediaData', googleresponse).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(result));
        this.props.history.push('/Dashboard')
      });
  };

  render() {

    const responseGoogle = (response) => {
      console.log(response);
      var res = response.profileObj;
      console.log(res);
      debugger;
      this.signup(response);
    }

    const successResponseGoogle = (res) => {
        console.log(res)
        let result = res;
        sessionStorage.setItem("userData", JSON.stringify(result));
        localStorage.setItem("userData", JSON.stringify(result));
        debugger;
        this.props.successLogin()
    }
    return (

      <div className="App">
        {/* <div className="row">
          <div className="col-sm-12 btn btn-info">
            Login With Google 
            </div>
        </div> */}

        <div className="row">
            <div className="container-google-btn">
                <div className="inner-goole-container">
                    <div className="logo-bi2i">
                        <img src={Logo} alt="bi2i-logo" style={{height:'90px'}} />
                    </div>
                <div className="login-text">
                    <h3>Single Sign on</h3>
                    <h6>Sign in with organisation identity.</h6>
                </div>

                <div className='btn-goole'>
                <GoogleLogin
                clientId="135694503326-85vo07d4r57l34q30m2vjukn5nvk32fc.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={successResponseGoogle}
                onFailure={responseGoogle} ></GoogleLogin>
                </div>

                <div className="info-txt">
                    <div>Powered By</div>
                    <div>Bridgei2i</div>
                </div>

                <div className="footer-details">
                    <p>Cookie Policy</p>
                    <p>Terms Of Use</p>
                    <p>Privacy Policy</p>
                </div>

                </div>
                
            </div>
          <div style={{ 'paddingTop': "20px" }} className="col-sm-12">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              
            </div>
            <div className="col-sm-4"></div>

          </div>
        </div>
      </div>
    )
  }
}

export default Logintbygoogle