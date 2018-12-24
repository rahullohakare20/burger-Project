import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-project-16a1a.firebaseio.com/"
});

export default instance;