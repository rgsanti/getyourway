export interface User {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    homeAirportCode: string;
    jwtToken: string | null;
    airToken: string | null;
}

export interface LoginFormValues {
    username: string;
    password: string;
}

export interface RegisterFormValues {
    username: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    homeAirportCode: string;
    password: string;
    email: string;
}