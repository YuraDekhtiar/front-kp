import React, {useContext, useEffect, useState} from 'react'
import {getAnswerResult, getTaskById, getUserAnswered, postSetRating} from "../API/TaskService";
import {Redirect, useParams} from "react-router-dom";
import {
    Alert,
    Button,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import RatingComponent from "../components/UI/RatingComponent";
import LoaderIndicator from "../components/UI/LoaderIndicator";
import ReactMarkdown from 'react-markdown'

import {AuthContext} from "../context";
import NotFoundPage from "./NotFoundPage";

const TaskDetailPage = (props) => {

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [task, setTask] = useState([]);
    const [userAnswer, setUserAnswer] = useState();
    const [isVisibleAlert, setIsVisibleAlert] = useState(false);
    const [userAnswered, setUserAnswered] = useState(false);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);


    useEffect(async () => {
        await getTaskById(params.id)
            .then(response => {
                setTask(response.data);
            }).catch(() => {
                setLoading(false);
                setError(true);
            })
        getUserAnswered(params.id)
            .then(response => {
                setUserAnswered(response.data);
            });
        setLoading(false);
    }, []);



    const isCorrect = async (e) => {
        e.preventDefault();
        await getAnswerResult(params.id, userAnswer).then(
            response => {
                console.log(response.data);
                if (response.data === true) {
                    setUserAnswered(true);
                }
            }
        )
        setIsVisibleAlert(true);

    }

    const handlerChange = async (e) => {
        await postSetRating(params.id, e.target.value);
        await getTaskById(params.id)
            .then(response => {
                setTask(response.data);
            });
    }

    if(loading) {
        return <LoaderIndicator />
    }
    if(error) {
        return (
            <Redirect to={"/error"}/>
        )
    }
    return (
        <>
            <Paper sx={{ p: 1, margin: 'auto', flexGrow: 1}}>
                <Grid container >
                    <Grid item textAlign="start" xs={12} sm={9} sx={{border: 0}}>
                        <Typography variant="h5">{task.title}</Typography>
                        <Grid item textAlign="start">
                            <Typography variant="subtitle1" component="div" sx={{color: "primary.main"}}>
                                {task.category}
                            </Typography>
                            <Typography variant="subtitle1" component="div" sx={{color: "#616161"}}>
                                {task.tags}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item textAlign="end"xs={12} sm={3} sx={{border: 0}}>
                        <RatingComponent
                            value={task.averageRating}
                            authenticated={isAuthenticated}
                            onChange={handlerChange}
                        />

                        <Typography variant="subtitle1" sx={{color:"#616161"}}>
                            {task.created}
                        </Typography>
                        <Typography variant="button" sx={{color: "primary.main"}}>
                            {task.author
                                ?task.author.name
                                :<>Неизвестно</>
                            }
                        </Typography>
                    </Grid>

                    <Grid xs={12} textAlign="center">
                        {task.images
                            ?
                            task.images.map((image) => (
                                    <img src={image.url} height={500} style={{margin:5}}/>
                            ))
                            : <></>
                        }
                    </Grid>

                    <Grid item xs={12} textAlign="start" mt={4}>
                        <ReactMarkdown>{task.body}</ReactMarkdown>
                        {isVisibleAlert
                            ?
                            !userAnswered
                                ?
                                <Alert severity="error">Ответ не верный!</Alert>
                                :
                                <></>
                            : <></>
                        }
                    </Grid>
                </Grid>
                {isAuthenticated
                    ?
                    !userAnswered
                        ?
                        <Grid container textAlign="center" mt={2} sx={{border: 0}}>
                            <Grid item xs={4} textAlign="start">
                                <Typography variant="subtitle2">Ваш ответ:</Typography>
                            </Grid>
                            <Grid item xs={4} textAlign="start">
                                <TextField sx={{
                                    width: "100%"
                                }}
                                           variant="standard"
                                           onChange={(e) => setUserAnswer(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4} textAlign="end">
                                <Button onClick={isCorrect}>Проверить</Button>
                            </Grid>
                        </Grid>
                        :
                        <Alert severity="success">Решено</Alert>
                    :
                    <></>
                }

            </Paper>
        </>
    )
}

export default TaskDetailPage
