import axios from "axios";
import router from "@/router.js";

export const SERVER_URL = 'https://viror.ru'

const api = axios.create()

// Start request
api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token')){
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }

    return config
}, error => {

})

// End request
api.interceptors.response.use(config => {
    if (localStorage.getItem('access_token')){
        config.headers.authorization = `Bearer ${localStorage.getItem('access_token')}`
    }

    return config
}, error => {
    if(error.response.data.message === 'Token has expired'){
        console.log(1111111111)
        return axios.post(`${SERVER_URL}/api/auth/refresh`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            localStorage.setItem('access_token', res.data.access_token)
            error.config.headers.authorization = `Bearer ${res.data.access_token}`
            return api.request(error.config)
        })
    }
    if (error.response.status === 401){
        router.push({name: 'login'})
    }
})

export default api