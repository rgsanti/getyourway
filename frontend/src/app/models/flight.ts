// @ts-nocheck
export interface Airport {
    text: string,
    value: string
}

export class AirportDetail {
    iata: string = '';
    name: string = '';
    city: string = '';
    country: string = '';
    lat: number = 0;
    lon: number = 0;
    tz: string = '';
    constructor(json: object) {
        this.iata=json.iata;
        this.name=json.name;
        this.city=json.city;
        this.country=json.country;
        this.lat=json.lat;
        this.lon=json.lon;
        this.tz=json.tz;
    }
}

export interface Flight {
    id: number,
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: Date,
    returnDate?: Date | null,
    passengerCount: number,
    transferCount: number,
    currencyCode: string,
    time: number
    price: number
}

export class Flight implements Flight {
    constructor(init?: FlightFormValues) {
        Object.assign(this, init);
    }
}

export class FlightFormValues {
    originLocationCode: string = '';
    destinationLocationCode: string = '';
    departureDate: Date | null = null;
    returnDate?: Date | null = null;
    passengerCount: number = 0;
    transferCount: number = 0
    currencyCode: string = '';
    price: number = 0;

    constructor(flight: Flight) {
        this.originLocationCode = flight.originLocationCode;
        this.destinationLocationCode = flight.destinationLocationCode;
        this.departureDate = flight.departureDate;
        this.returnDate = flight.returnDate;
        this.passengerCount = flight.passengerCount;
        this.transferCount = flight.transferCount;
        this.currencyCode = flight.currencyCode;
        this.price = flight.price;
    }
}

export interface FlightSearchFormValues {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: Date | null;
    returnDate: Date | null;
    passengerCount: number;
    currencyCode: string;
}