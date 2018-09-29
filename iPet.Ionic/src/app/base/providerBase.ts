import { HttpProvider } from './../../providers/http/http';
import { HttpResultModel } from '../models/HttpResultModel';
export abstract class Providerbase<T> {
    constructor(
        public url: string,
        public http: HttpProvider) { 
    }

    get():Promise<HttpResultModel> {
        return this.http.get(this.url);
    }
    getByid(uid: string):Promise<HttpResultModel>{
        return this.http.get('$(this.url)/$(uid)');
    }
    post(model: T): Promise<HttpResultModel>{
        return null;
    }


}