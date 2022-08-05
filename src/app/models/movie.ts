export interface Movie {
    languages: string[]
    urlIMDB: string
    year: number
    releaseDate: string
    directors: MovieDirector[]
    rating: string
    runtime: number
    writers: MovieWriter[]
    filmingLocations: FilmingLocation[]
    countries: string[]
    type: string
    title: string
    idIMDB: string
    rated: any
    plot: string
    simplePlot: string
    votes: string
    metascore: string
    urlPoster: string
}

export interface MovieDirector {
    id: string
    name: string
}

export interface MovieWriter {
    name: string
    id: string
}
export interface FilmingLocation {
    location: string
}