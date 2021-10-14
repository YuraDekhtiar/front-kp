import axios from "axios";
import {API_BASE_URL} from "../constants";
import {getAccessToken, getConfig} from "./APIUtils";

export async function getTaskById(id) {
    return await axios.get(API_BASE_URL + "/tasks/" + id, getConfig());
}

export async function getTaskByIdForEdit(id) {
    return await axios.get(API_BASE_URL + "/tasks/edit/" + id, getConfig());
}

export async function deleteTaskByListId(id) {
    return await axios.post(API_BASE_URL + "/tasks/delete/", id, getConfig());
}

export async function getCategories() {
    return await axios.get(API_BASE_URL + "/category", getConfig());
}

export async function getAnswerResult(id, answer) {
    return await axios.get(API_BASE_URL + "/tasks/" + id, {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            answer: answer
        }
    });
}

export async function getTaskRating(id) {
    return await axios.get(API_BASE_URL + "/tasks/" + id + "/rating/", getConfig());
}

export async function postSetRating(id, value) {
    return await axios.post(API_BASE_URL + "/rating/" + id + "/" + value, "", getConfig());
}

export async function getUserAnswered(id) {
    return await axios.get(API_BASE_URL + "/tasks/" + id + "/answered", getConfig());
}

export async function searchTask(query) {
    return await axios.get(API_BASE_URL + "/tasks", {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            search: query,
        }
    });
}


export async function getAll(limit = 10, page = 0, sort="created") {
    return await axios.get(API_BASE_URL + "/tasks", {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            limit: limit,
            page: page,
            sort: sort
        }
    });
}

export async function getAllByUserId(id) {
    return await axios.get(API_BASE_URL + "/tasks", {
        headers: {'Authorization': 'Bearer ' + getAccessToken()},
        params: {
            user_id: id,
        }
    });
}