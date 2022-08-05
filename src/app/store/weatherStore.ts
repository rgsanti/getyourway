import {makeAutoObservable, runInAction} from 'mobx';
import client from '../api/client';
import {AirportDetail} from '../models/flight';
import {toast} from 'react-toastify';

export default class WeatherStore {
    // @ts-ignore
    weather:object =null;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    getForecast = async (ar: AirportDetail ) => {
        this.loadingInitial = true;

        try {
            const weather = await client.WeatherClient.getForecast(ar);

            runInAction(() => {
                this.weather = weather
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