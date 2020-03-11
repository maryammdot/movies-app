import fetch from 'unfetch'
import { GetMoviesUseCase } from '../../application/service/GetMoviesUseCase'
import { HttpMoviesRepository } from '../movies/HttpMoviesRepository'
import {SortMoviesUseCase} from "../../application/service/SortMoviesUseCase";
import {InMemmoryMoviesRepository} from "../movies/InMemmoryMoviesRepository";

export default class Container {
    constructor({ config }) {
        this._config = config
        this._instances = new Map()
        this._buildEagerInstances()
    }

    getInstance({ key }) {
        if (undefined === this._instances.get(key)) {
            try {
                this._instances.set(key, this['_build' + key]())
            } catch (e) {
                throw new Error(`Error creating instance: ${key}: ${e.message}`)
            }
        }
        return this._instances.get(key)
    }

    _buildGetMoviesUseCase() {
        return new GetMoviesUseCase({
            repository: this._buildHttpMoviesRepository()
        })
    }

    _buildSortMoviesUseCase() {
        return new SortMoviesUseCase({
            repository: this._buildInMemmoryMoviesRepository(),
            sortMoviesService: this._buildSortMoviesService()
        })
    }

    _buildHttpMoviesRepository() {
        return new HttpMoviesRepository({
            url: this._config.moviesAPIUrl,
            fetcher: fetch
        })
    }

    _buildInMemmoryMoviesRepository() {
        return new InMemmoryMoviesRepository()
    }

    _buildSortMoviesService () {
        return new SortMoviesService()
    }

    _buildEagerInstances() {}
}
