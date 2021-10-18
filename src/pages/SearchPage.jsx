import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {searchTask} from "../API/TaskService";
import {getCurrentUser} from "../API/UserServices";
import LoaderIndicator from "../components/UI/LoaderIndicator";
import {Grid, Typography} from "@mui/material";
import TaskCard from "../components/UI/TaskCard";
import {AuthContext} from "../context";

const SearchPage = () => {
    const params = useParams()
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    useEffect( async () => {
        setLoading(true);
        searchTask(params.query)
            .then(response => {
                setTasks(response.data);
            })
        setLoading(false);
    },[params]);

    if(loading) {
        return <LoaderIndicator />
    }

    return (
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            {tasks.length === 0
            ?
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h5">{params.query} - не найдено</Typography>
                </Grid>
            :
            tasks.map((task) =>
                <Grid item md={12}>
                    <TaskCard task={task} isAuthenticated={isAuthenticated} />
                </Grid>
            )
        }

        </Grid>
    )
}

export default SearchPage
