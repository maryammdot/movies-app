class HttpMoviesRepository {
    constructor({url, fetcher}) {
        this._url = url
        this._fetcher = fetcher
    }
    async getMovies({query}) {
        const response = await this._fetcher(this._url + query)
        return response.json()
    }
}

export {HttpMoviesRepository}