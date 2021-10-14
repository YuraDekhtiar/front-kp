import React, {useContext, useEffect, useState} from 'react'
import {Container, Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import UserNoAvatar from "../components/UI/UserNoAvatar";
import CreateIcon from '@mui/icons-material/Create';
import TaskIcon from '@mui/icons-material/Task';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {getCurrentUser} from "../API/UserServices";
import LoaderIndicator from "../components/UI/LoaderIndicator";
import {getAllByUserId} from "../API/TaskService";
import TasksTable from "../components/UI/TasksTable";
import {Link} from "react-router-dom";

const ProfilePage = (props) => {
    const [user, setUser] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect( async () => {
        await getCurrentUser()
            .then(response => {
                setUser(response.data);
            });

        await getAllByUserId(props.currentUser.id)
            .then(response => {
                setTasks(response.data);
            });

        setLoading(false);
    },[]);

    if(loading) {
        return <LoaderIndicator />
    }
    return (
        <Container>
            <Paper sx={{ p: 1, margin: 'auto', flexGrow: 1}}>
                <Grid container xs={12}>
                    <Grid container xs={8}>
                        <Grid item textAlign="start" minWidth={100}>
                            {user.imageUrl
                                ?
                                <img src={user.imageUrl} alt={user.name} style={{borderRadius:100}}/>
                                :
                                <UserNoAvatar userName={user.name} />
                            }
                        </Grid>
                        <Grid item xs={8}>
                            <Typography  mt={2} mr={10} color="#37474f" variant="h4" component="h4">
                                {user.name}
                            </Typography>
                            <Typography  mt={1} mr={10} color="#62727b" variant="subtitle2" component="p">
                                {user.email}
                            </Typography>
                            <Typography  mt={1} mr={10} color="#62727b" variant="subtitle2" component="p">
                                Зарегистрирован: <>  </>
                                {user.registered}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container xs={4}>
                        <Grid item xs={8}>
                            <Typography  mt={2} ml={1} color="#00c853" variant="h6" component="h4">Мои достижения:</Typography>
                            <Typography  mt={1} ml={1} variant="h6" component="div" color="#4f5b62" >
                                <Tooltip title="Количество решенных задач">
                                    <TaskIcon sx={{color:"#ffd600", marginRight:1}} fontSize="large"/>
                                </Tooltip>
                                {user.taskCompletedCount}
                            </Typography>
                            <Typography  mt={1} ml={1} variant="h6" component="div" color="#4f5b62" >
                                <Tooltip title="Количество созданных задач">
                                    <CreateIcon sx={{color:"#4f5b62", marginRight:1}} fontSize="large" />
                                </Tooltip>
                                {user.taskCreatedCount}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="right">
                                <Link to={"/create/"}>
                                    <Tooltip title="Создать задачу">
                                        <IconButton>
                                            <AddCircleIcon sx={{ fontSize: 60, color: "#00C853"}}/>
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TasksTable tasks={tasks}/>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default ProfilePage;
