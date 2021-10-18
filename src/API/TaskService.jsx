import axios from "axios";
import {API_BASE_URL} from "../constants";
import {getAccessToken, getConfig} from "./APIUtils";

export async function getTaskById(id) {
    return await axios.get(API_BASE_URL + "/tasks/" + id, getConfig());
}

export async function getTaskByIdForEdit(id) {
    return await axios.get(API_BASE_URL + "/tasks/edit/" + id, getConfig());
}

export async function getAllTasks(limit, page, sort="created") {
    return await axios.get(API_BASE_URL + "/tasks", {
        params: {
            limit: limit,
            page: page,
            sort: sort
        }
    });
}

export async function getAllTasksByUserId(id) {
    return await axios.get(API_BASE_URL + "/tasks", {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            user_id: id,
        }
    });
}

export async function getCategories() {
    return await axios.get(API_BASE_URL + "/category", getConfig());
}

export async function sendUserAnswer(id, answer) {
    return await axios.get(API_BASE_URL + "/tasks/" + id, {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            answer: answer
        }
    });
}

export async function getUserAnswered(id) {
    return await axios.get(API_BASE_URL + "/tasks/" + id + "/answered", getConfig());
}

export async function getTaskRating(id) {
    return await axios.get(API_BASE_URL + "/tasks/" + id + "/rating/", getConfig());
}

export async function deleteTaskByListId(id) {
    return await axios.post(API_BASE_URL + "/tasks/delete/", id, getConfig());
}

export async function addNewTask(task) {
    return await axios.post(API_BASE_URL + "/tasks/", task, getConfig())

}

export async function setRating(id, value) {
    return await axios.get(API_BASE_URL + "/rating/" + id + "/" + value, getConfig());
}

export async function searchTask(query) {
    return await axios.get(API_BASE_URL + "/tasks", {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            search: query,
        }
    });
}



