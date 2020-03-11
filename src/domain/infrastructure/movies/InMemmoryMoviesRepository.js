class InMemmoryMoviesRepository {
    constructor() {
        this._movies = new Map()
    }

    getMovies({query}) {
        return this._movies.get(query)
    }

    saveMovies({query, movies}) {
        this._movies.set(query, movies)
    }

}

export {InMemmoryMoviesRepository}