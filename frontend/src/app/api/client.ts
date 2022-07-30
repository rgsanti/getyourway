import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Flight, FlightFormValues, FlightSearchFormValues} from '../models/flight';
import {LoginFormValues, RegisterFormValues, User} from '../models/user';
import {store} from '../store/store';
import {Movie} from "../models/movie";

axios.defaults.baseURL = "http://localhost:8090/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = store.commonStore.token;
    if (token) {
        if (config.headers === undefined) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const requests =
{
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const FlightClient =
{
    getAllSave: () => requests.get<Flight[]>('/flight/save'),
    save: (flight: FlightFormValues) => requests.post<String>('/flight/save', flight),
    search: (flight: FlightSearchFormValues) => requests.post<Flight[]>('/flight/search', flight),
    deleteSave: (id: number) => requests.del<void>(`/flight/save/${id}`),
}

const UserClient =
{
    current: () => requests.get<User>('/user'),
    login: (user: LoginFormValues) => requests.post<User>('/login', user),
    register: (user: RegisterFormValues) => requests.post<String>('/register', user)
}

const MovieClient =
{
    skyOriginals: () => requests.get<Movie[]>('/movie/sky-originals')
}

const client =
{
    FlightClient,
    UserClient,
    MovieClient
}

export default client;