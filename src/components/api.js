import axios from 'axios'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export const myPost = (url,params) => {
    return axios.post('http://localhost:8067/api'+ url, params )
}
export const myGet = (url,params) => {
    return axios.get('http://localhost:8067/api' + url, params)
}