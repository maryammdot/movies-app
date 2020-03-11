class Domain {
    constructor({ container }) {
        this._container = container
    }

    async getMovies({ query }) {
        return this._container
            .getInstance({ key: 'GetMoviesUseCase' })
            .execute({ query })
    }

    async sortMoviesByName() {
        return this._container
            .getInstance({ key: 'SortMoviesUseCase' })
            .execute()
    }
}

export { Domain }
