class SortMoviesUseCase {
    constructor({repository, sortMoviesService}) {
        this._repository = repository
        this._sortMoviesService = sortMoviesService
    }

    async execute() {
        const movies = await this._repository.getMovies()
        return this._sortMoviesService.sortByName({movies})
    }
}

export {SortMoviesUseCase}