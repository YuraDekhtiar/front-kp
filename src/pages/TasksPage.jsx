import React, {useContext, useEffect, useState} from 'react'
import {Grid} from "@mui/material";
import TaskCard from "../components/UI/TaskCard";
import {AuthContext} from "../context";
import {getAll} from "../API/TaskService";
import LoaderIndicator from "../components/UI/LoaderIndicator";

const TasksPage = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    useEffect(async () => {
        await getAll()
            .then(response => {
                setTasks(response.data);
            });
        setLoading(false);
    }, []);
    if(loading) {
        return <LoaderIndicator />
    }
  return (
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          {tasks.map((task) =>
              <Grid item md={6}>
                  <TaskCard task={task} isAuthenticated={isAuthenticated} />
              </Grid>
          )}
      </Grid>
  )
}

export default TasksPage
