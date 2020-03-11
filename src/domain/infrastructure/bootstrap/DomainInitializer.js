import {Domain} from '../../application/Domain'
import Container from '../container/Container'

export default class DomainInitializer {
    static init({config}) {
        return new Domain({container: new Container({config})})
    }
}