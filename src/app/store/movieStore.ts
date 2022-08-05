import {makeAutoObservable, runInAction} from 'mobx';
import client from '../api/client';
import {toast} from 'react-toastify';
import {Movie} from "../models/movie";

export default class MovieStore {
    skyOriginals: Movie[] = [];
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    getSkyOriginals = async () => {
        this.loadingInitial = true;

        try {
            const skyOriginals = await client.MovieClient.skyOriginals();

            runInAction(() => {
                this.skyOriginals = skyOriginals
            });

            this.loadingInitial = false;
        }
        catch(error) {
            // @ts-ignore
            const {data, status} = error.response!;

            switch (status) {
                case 403:
                    toast.error("Unauthorized access!");
                    window.location.reload();
                    break;
                case 500:
                    console.log(data);
                    toast.error('Internal server error! See console log!')
                    break;
            }
            this.loadingInitial = false;
        }
    }
}