import axios from 'axios'
import { getJwtToken } from './auth'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const clientURL = process.env.NEXT_PUBLIC_FRONTEND_URL
const token = getJwtToken()

const BackendAxios = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
})
BackendAxios.defaults.headers.common.Authorization = `Bearer ${token}`
BackendAxios.defaults.withCredentials = true


export const FormAxios = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'multipart/form-data',
    },
})
FormAxios.defaults.withCredentials = true
FormAxios.defaults.headers.common.Authorization = `Bearer ${token}`


export const DefaultAxios = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
})

export const ClientAxios = axios.create({
    clientURL,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'multipart/form-data'
    },
})

export default BackendAxios