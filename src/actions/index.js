import axios from 'axios';
import {
    browserHistory
} from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE
} from './types';
const ROOT_URL = `http://localhost:3090`;

export function signinUser({
    email,
    password
}) {
    return function (distpatch) {
        axios.post(`${ROOT_URL}/signin`, {
                email,
                password
            })
            .then((response) => {
                distpatch({
                    type: AUTH_USER
                })
                localStorage.setItem('token', response.data.token);
                browserHistory.push("/feature");
            })
            .catch(() => {
                distpatch(authError("Bad Login Info"));
            });
    }
}
export function signoutUser() {
    localStorage.removeItem("token");
    return {
        type: UNAUTH_USER,
        payload: "Logout"
    }
}

export function signupUser({
    email,
    password
}) {
    return function (distpatch) {
        axios.post(`${ROOT_URL}/signup`, {
                email,
                password
            })
            .then((response) => {
                distpatch({
                    type: AUTH_USER
                })
                localStorage.setItem('token', response.data.token);
                browserHistory.push("/feature");
            })
            .catch((response) => {
                distpatch(authError(response.response.data.error));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
export function fetchMessage() {
    return function (distpatch) {
        axios.get(ROOT_URL, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((response) => {
            return distpatch( {
                type:FETCH_MESSAGE,
                payload:response.data.hi
            });
        });
    }
}