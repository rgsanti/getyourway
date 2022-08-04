import {makeAutoObservable, runInAction} from 'mobx';
import client from '../api/client';
import {airportIATAOptions} from '../util/options/AirportOptions';
import {ukAirportIATAOptions} from "../util/options/UKAirportOptions";
import airportDetailsJson from "../util/options/AirportDetails.json";
import {Airport, AirportDetail, Flight, FlightSearchFormValues} from '../models/flight';
import {toast} from 'react-toastify';

export default class FlightStore {
    airports: Airport[] = airportIATAOptions;
    ukAirports: Airport[] = ukAirportIATAOptions;
    airportCodeToDetailsMap: Map<string, AirportDetail> = new Map();
    locationToAirportMap: Map<string, AirportDetail> = new Map();
    flights: Flight[] = [];
    savedFlights: Flight[] = [];
    loading = false;
    loadingInitial = false;
    loadingSearch = false;

    constructor() {
        makeAutoObservable(this);
        airportDetailsJson.forEach(airport => {
            this.airportCodeToDetailsMap.set(airport.iata, new AirportDetail(airport));
            this.locationToAirportMap.set(airport.city, new AirportDetail(airport));
            //manual additions
            if (airport.iata === 'LPL') {
                this.locationToAirportMap.set('Llandudno', new AirportDetail(airport));
            }
        });

    }

    deleteSelectedSavedFlight = async (id: number) => {
        this.loading = true;

        try {
            await client.FlightClient.deleteSave(id);

            runInAction(() => {
                this.savedFlights = this.savedFlights.filter(flight => flight.id !== id);
                this.loading = false;
                toast.success("Flight deleted");
            });
        } catch (error) {
            console.error(error);
            toast.error('Error has occurred! See console log!');

            this.loading = false;
        }
    }

    getFlights = async () => {
        runInAction(() => {
            this.flights = []
        });
    }

    getSavedFlights = async () => {
        this.loadingInitial = true;

        try {
            const flights = await client.FlightClient.getAllSave();

            runInAction(() => {
                this.savedFlights = flights
            });

            this.loadingInitial = false;
        } catch (error) {
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

    saveSelectedFlight = async (id: number) => {
        this.loading = true;

        try {
            const selectedFlight = this.flights.find(flight => flight.id === id);
            await client.FlightClient.save(selectedFlight!);

            runInAction(() => {
                this.flights = this.flights.filter(flight => flight.id !== id);
                this.loading = false;
                toast.success("Flight saved");
            });
        } catch (error) {
            console.error(error);
            toast.error('Error has occurred! See console log!');

            this.loading = false;
        }
    }

    searchFlights = async (search: FlightSearchFormValues) => {
        this.loadingSearch = true;

        try {
            const flights = await client.FlightClient.search(search);

            runInAction(() => {
                this.flights = flights
            });

            this.loadingSearch = false;

            if (flights.length > 0) toast.info("Found " + flights.length + " result(s)!");
            else toast.info("No results were found!");
        } catch (error) {
            this.loadingSearch = false;
            throw error;
        }
    }
}