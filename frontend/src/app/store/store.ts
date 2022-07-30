import {createContext, useContext} from 'react';
import CommonStore from './commonStore';
import FlightStore from './flightStore';
import ModalStore from './modalStore';
import UserStore from './userStore';
import MovieStore from "./movieStore";

interface Store {
    commonStore: CommonStore;
    flightStore: FlightStore;
    modalStore: ModalStore,
    userStore: UserStore;
    movieStore: MovieStore;
}

export const store: Store =
{
    commonStore: new CommonStore(),
    flightStore: new FlightStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    movieStore: new MovieStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}