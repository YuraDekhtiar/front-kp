import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Grid, Paper, Typography} from "@mui/material";

class NotFoundPage extends Component {
    render() {
        return (
            <Paper sx={{ p: 5, margin: "auto", marginTop: 10, maxWidth: 500, flexGrow: 1}}>
                <Typography variant="h1" sx={{textAlign: "center"}}>
                    404
                </Typography>
                <Typography variant="h5" component="div" sx={{marginTop: 2, textAlign: "center"}}>
                    Страница не найдена.
                </Typography>
                <Grid item textAlign="center" margin={3}>
                    <Link to="/"><Button variant="contained">Go Back</Button></Link>
                </Grid>
            </Paper>
        );
    }
}

export default NotFoundPage;