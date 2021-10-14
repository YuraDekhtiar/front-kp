import React, {useEffect, useState} from 'react'
import {Container, MenuItem, Paper, Select, TextareaAutosize, TextField, Typography} from "@mui/material";
import './Create.css'
import Button from "@mui/material/Button";
import UploadForm from "../components/UI/UploadForm";
import {uploadFile} from "../API/FileService";
import {API_BASE_URL} from "../constants";
import axios from "axios";
import {getConfig} from "../API/APIUtils";
import {getCategories} from "../API/TaskService";
import LoaderIndicator from "../components/UI/LoaderIndicator";
import MySelect from "../components/UI/MySelect";
import {Redirect} from "react-router-dom";
import { useAlert } from "react-alert";

const Create = (effect, deps) => {
    const alert = useAlert();
    const [loading, setLoading] = useState(true);
    const [responseId, setResponseId] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [task, setTask] = useState({title: '', body:'', category:'', tags: '', answers:[], images:[] });
    const [categories, setCategories] = useState([]);
    const myAnswers = [];
    const files = [];

    useEffect( async () => {
        await getCategories()
            .then(response => {
                setCategories(response.data);
            })
        setLoading(false);
    },[]);

    const save = async () => {
        task.answers = myAnswers;
        const formData = new FormData();

        files.map((file) => {
            if (file !== undefined) {
                formData.append('file', file);
            }
        });
        setLoading(true);

        if(formData.getAll('file').length !== 0)
            await uploadFile(formData).then(response => {
                task.images = response.data;

            })

        await axios.post(API_BASE_URL + "/tasks/", task, getConfig())
            .then(response => {
                if(response.status == 200){
                    setLoading(false);
                    setResponseId(response.data);
                    alert.success('Сохранено!')
                    setRedirect(true);
                }
            }).catch(() => {
                alert.error('Ошибка!')
                setLoading(false);
            })
    }
    if(loading)
        return (
            <LoaderIndicator/>
        );
    if(redirect)
        return (
            <Redirect to={"/tasks/" + responseId} />
        );

    return (
        <Container maxWidth="sm" >

            <Paper sx={{ p: 1,flexGrow: 1}}>
                <Typography
                    textAlign={'center'}
                    marginTop={2}
                    variant="h4"
                >
                    Создать задачу
                </Typography>

                <TextField sx={{
                    marginTop: 2,
                    width: "100%"
                }}
                           label="Название"
                           variant="standard"
                           onInput={e => setTask({...task, title: e.target.value})}
                />
                <TextareaAutosize
                    id="bodyText"
                    aria-label="minimum height"
                    minRows={3}
                    maxRows={10}
                    placeholder="Описание (условие)"
                    style={{width: "100%"}}
                    onInput={e => setTask({...task, body: e.target.value})}

                />

                <Typography
                    sx={{
                        margin:2,
                    }}
                    variant="h6"
                >
                    Загрузить изображения
                </Typography>

                <UploadForm onFileChange={(e) => { files[0] = e.target.files[0]}}/>
                <UploadForm onFileChange={(e) => { files[1] = e.target.files[0]}}/>
                <UploadForm onFileChange={(e) => { files[2] = e.target.files[0]}}/>

                <Typography
                    marginTop={2}
                    variant="p1"

                >
                    Выберите категорию
                </Typography>
                <MySelect
                    task={task}
                    setTask={setTask}
                    categories={categories}
                    defaultValue=""/>
                <TextField sx={{width: "100%"}}
                           id="tags"
                           label="Теги"
                           variant="standard"
                           onInput={e => setTask({...task, tags: e.target.value})}
                />

                <TextField sx={{
                    marginTop: 2,
                    width: "100%"
                }}
                           label="Ответ 1"
                           variant="standard"
                           onChange={e =>  myAnswers[0] = {text:e.target.value} }
                />
                <TextField sx={{
                    width: "100%"
                }}
                           label="Ответ 2"
                           variant="standard"
                           onChange={e =>  myAnswers[1] = {text:e.target.value} }
                />
                <TextField sx={{
                    width: "100%"
                }}
                           label="Ответ 3"
                           variant="standard"
                           onChange={e =>  myAnswers[2] = {text:e.target.value} }
                />

                <div className="div_save">
                    <Button onClick={save}>Save</Button>
                </div>
            </Paper>
        </Container>
    )
}

export default Create
