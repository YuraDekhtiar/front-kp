import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, Grid, Paper, Rating, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {NO_IMG_URL} from "../../constants";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '300px',
    marginTop: 10,
});

export default function TaskCard(props) {
    return (
        <Paper sx={{ p: 1, flexGrow: 1}}>
            <Grid container >
                <Grid item width="50%" sx={{textAlign:"start"}}>
                    <Rating value={props.task.averageRating} readOnly={true} />
                </Grid>
                <Grid item width="50%" sx={{textAlign:"end"}}>
                    <Typography variant="subtitle1">
                        {props.task.created}
                    </Typography>
                </Grid>

                <Grid item xs={12} >
                    {props.task.images.length > 0
                        ?
                        <Img alt="Image" src={props.task.images[0].url} />
                        :
                        <Img alt="Image" src={NO_IMG_URL} />
                    }
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="h6" component="h2">
                        {props.task.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" >
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div" sx={{color: "primary.main"}}>
                                {props.task.category}
                            </Typography>
                        </Grid>
                        <Grid item xs sx={{textAlign:"end"}}>
                            <Link to={"/tasks/" + props.task.id}>
                                <Button variant="text" >OPEN</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
