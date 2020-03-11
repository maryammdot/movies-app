class GetMoviesUseCase {
    constructor({repository}) {
        this._repository = repository
    }

    async execute({query}) {
        return this._repository.getMovies({query})
    }
}
export {GetMoviesUseCase}