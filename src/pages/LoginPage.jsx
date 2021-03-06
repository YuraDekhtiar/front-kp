import React from 'react'
import {Redirect} from "react-router-dom";
import {Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../constants";
import fbLogo from '../img/fb-logo.png';
import googleLogo from '../img/google-logo.png';
import githubLogo from '../img/github-logo.png';
const LoginPage = (props) => {
    if(props.authenticated) {
        return <Redirect
            to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;
    }
    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 5, flexGrow: 1}}>
                <Typography variant="h5" mb={2} textAlign="center">Вход через:</Typography>

                <Button variant="" sx={{width:"100%", height:50, marginTop:1}} href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" height={40}/>
                    <Typography ml={2}>Войти с помощью Google</Typography>
                </Button>
                <Button variant="" sx={{width:"100%", height:50, marginTop:1}} href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" height={40}/>
                    <Typography ml={2}>Войти с помощью Facebook</Typography>
                </Button>
                <Button variant="" sx={{width:"100%", height:50, marginTop:1}} href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" height={40}/>
                    <Typography ml={2}>Войти с помощью Github</Typography>
                </Button>
            </Paper>
        </Container>
    )
}

export default LoginPage
