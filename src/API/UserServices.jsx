import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import {getConfig} from "./APIUtils";
import axios from "axios";

export async function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return await axios.get(API_BASE_URL + "/user/me", getConfig());
}