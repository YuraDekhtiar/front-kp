import { ACCESS_TOKEN } from '../constants';


export function getAccessToken() {
    if(localStorage.getItem(ACCESS_TOKEN))
        return localStorage.getItem(ACCESS_TOKEN);
}

export function getConfig() {
    return {
        headers: {'Authorization': 'Bearer ' + getAccessToken()}
    }
}




/*



export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}




export function request(options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    headers.append('Authorization', 'Bearer ' + getAccessToken());

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};
 */

