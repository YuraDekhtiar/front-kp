import React, {useContext, useEffect, useRef, useState} from 'react'
import {Grid, Pagination, Stack} from "@mui/material";
import TaskCard from "../components/UI/TaskCard";
import {AuthContext} from "../context";
import {getAll, getAllTasks} from "../API/TaskService";
import LoaderIndicator from "../components/UI/LoaderIndicator";

const TasksPage = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    useEffect(async () => {
        setLoading(true);

        await getAllTasks(limit, currentPage)
            .then(response => {
                setTasks(response.data);
                const totalCount = response.headers['x-total-count'];
                setTotalPages(getPageCount(totalCount, limit));
            });
        setLoading(false);

    }, [currentPage]);

    const getPageCount = (totalCount, limit) => {
        return Math.ceil(totalCount / limit)
    }

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setCurrentPage(newPage-1);
    };


    if(loading) {
        return <LoaderIndicator />
    }
    return (
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            {tasks.map((task) =>
                <Grid item md={12}>
                    <TaskCard task={task} isAuthenticated={isAuthenticated} />
                </Grid>
            )}
            <Grid container mt={5} xs={12} justifyContent="center">
                    <Pagination page={currentPage+1} count={totalPages} onChange={handleChangePage} shape="rounded" />
            </Grid>
        </Grid>
    )
}

export default TasksPage
