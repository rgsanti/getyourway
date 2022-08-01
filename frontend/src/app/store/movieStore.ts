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
        catch (error) {
            console.error(error);
            toast.error("Error has occurred. See console log!");

            this.loadingInitial = false;
        }
    }
}