import fetch from 'unfetch'
import { GetMoviesUseCase } from '../../application/service/GetMoviesUseCase'
import { HttpMoviesRepository } from '../movies/HttpMoviesRepository'
import {SortMoviesUseCase} from '../../application/service/SortMoviesUseCase'
import {InMemmoryMoviesRepository} from '../movies/InMemmoryMoviesRepository'
import {SortMoviesService} from '../../domain/SortMoviesService'
import {ChainedMoviesRepository} from '../movies/ChainedMoviesRepository'

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
            repository: this.getInstance({key: 'ChainedMoviesRepository'})
        })
    }

    _buildSortMoviesUseCase() {
        return new SortMoviesUseCase({
            repository: this.getInstance({key: 'ChainedMoviesRepository'}),
            sortMoviesService: SortMoviesService
        })
    }

    _buildChainedMoviesRepository() {
        return new ChainedMoviesRepository({
            httpRepository: this.getInstance({key: 'HttpMoviesRepository'}),
            inMemmoryRepository: this.getInstance({key: 'InMemmoryMoviesRepository'})
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
    
    _buildEagerInstances() {}
}
