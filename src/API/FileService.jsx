import {API_BASE_URL} from "../constants";
import axios from "axios";
import {getConfig} from "./APIUtils";


export function uploadFile(formData) {
    return axios.post(API_BASE_URL + "/upload", formData, getConfig());
}

