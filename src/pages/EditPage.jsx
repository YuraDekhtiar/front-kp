import React, {useEffect, useState} from 'react'
import {getCategories, getTaskById, getTaskByIdForEdit} from "../API/TaskService";
import {useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import LoaderIndicator from "../components/UI/LoaderIndicator";
import {Container, TextareaAutosize, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import MySelect from "../components/UI/MySelect";

const EditPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState([]);
    const [editTask, setEditTask] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);

    const myAnswers = [];

    const params = useParams();

    useEffect(async () => {
        await getTaskByIdForEdit(params.id)
            .then(response => {
                setTask(response.data);
            });
        await getCategories()
            .then(response => {
                setCategories(response.data);
            })
        setLoading(false);
        console.log(task);
    }, []);

    if(loading)
        return (
            <LoaderIndicator/>
        )

    if(!props.currentUser.id === task.author.id)
        return (
            <NotFoundPage/>
        )
    return (
        <Container maxWidth="sm">
            {console.log(task)}
            <Typography
                textAlign={'center'}
                marginTop={2}
                variant="h4"
            >
                Редактирования
            </Typography>

            <TextField sx={{
                marginTop: 2,
                width: "100%"
            }}
                label="Название"
                variant="standard"
                onChange={e => setTask({...editTask, title: e.target.value})}
                defaultValue={task.title}
            />

            <TextareaAutosize
                id="bodyText"
                aria-label="minimum height"
                minRows={3}
                maxRows={10}
                placeholder="Task Description"
                style={{width: "100%"}}
                onChange={e => setTask({...editTask, body: e.target.value})}
                defaultValue={task.body}
            />

            <Typography
                sx={{
                    margin:2,
                }}
                variant="h6"
            >
                Upload Your File
            </Typography>

            <Typography
                marginTop={2}
                variant="p1"
            >
                Категория
            </Typography>
            <MySelect categories={categories} setCategory={setSelectedCategory} defaultValue={task.category}/>

            <input type="file" className="form-control" name="file" onChange={props.onFileChange}/>

            <TextField sx={{width: "100%"}}
                       id="tags"
                       label="Теги"
                       variant="standard"
                       onChange={e => setTask({...editTask, tags: e.target.value})}
                       defaultValue={task.tags}
            />
            {task.answers.map((answer, index) =>
                <TextField sx={{
                    marginTop: 2,
                    width: "100%"
                }}
                           label={"Ответ " +  (index+1)}
                           variant="standard"
                           onChange={e =>  myAnswers[index] = {text:e.target.value} }
                           defaultValue={task.answers[index].text}
                />
                )
            }


            <div className="div_save">
                <Button >Save</Button>
            </div>
        </Container>
    )
}

export default EditPage
