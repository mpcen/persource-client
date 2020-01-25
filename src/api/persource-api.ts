import axios from 'axios';
import { AsyncStorage } from 'react-native';

let url;
if (__DEV__) {
    url = 'http://192.168.0.210:3000/';
} else {
    url = 'https://persource-api.herokuapp.com/';
}

const instance = axios.create({
    baseURL: url
});

instance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('persource-token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default instance;
