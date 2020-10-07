import axios from 'axios';
import {AUTH_USER, LOGIN_USER, SIGNUP_USER} from './types';
import {USER_SERVER} from '../components/config';

export function signUpUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/signup`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SIGNUP_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios
        .get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}