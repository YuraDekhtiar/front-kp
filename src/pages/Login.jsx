import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../constants';
import { Redirect } from 'react-router-dom'
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import githubLogo from '../img/github-logo.png';
import {MDBBtn} from "mdb-react-ui-kit";


class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
               /* Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });*/
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login to social</h1>
                    <div className="d-grid gap-2">
                        <MDBBtn className="text-dark, social-btn" color='light' href={GOOGLE_AUTH_URL}>
                            <img src={googleLogo} alt="Google" />
                            Sign up with Google
                        </MDBBtn>
                        <MDBBtn className="text-dark, social-btn" color='light' href={FACEBOOK_AUTH_URL}>
                            <img src={fbLogo} alt="Facebook" />
                            Sign up with Facebook
                        </MDBBtn>
                        <MDBBtn className="text-dark, social-btn" color='light' href={GITHUB_AUTH_URL}>
                            <img src={githubLogo} alt="Github" />
                            Sign up with Github
                        </MDBBtn>
                    </div>
                </div>
            </div>
        );
    }
}





export default Login
