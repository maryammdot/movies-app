class SortMoviesUseCase {
    constructor({repository, sortMoviesService}) {
        this._repository = repository
        this._sortMoviesService = sortMoviesService
    }

    async execute({query}) {
        const movies = await this._repository.getMovies({query})
        return this._sortMoviesService.sortByName({movies})
    }
}

export {SortMoviesUseCase}