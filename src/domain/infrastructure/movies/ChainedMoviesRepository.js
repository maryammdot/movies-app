class ChainedMoviesRepository {
    constructor({httpRepository, inMemmoryRepository}) {
        this._httpRepository = httpRepository
        this._inMemmoryRepository = inMemmoryRepository
    }
    
    async getMovies({query}) {
        let movies = this._inMemmoryRepository.getMovies({query})
        if (!movies) {
            movies = await this._httpRepository.getMovies({query})
            this._inMemmoryRepository.saveMovies({query, movies})
        }
        return movies
    }
}
export {ChainedMoviesRepository}