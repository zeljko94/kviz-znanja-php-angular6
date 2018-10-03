
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  headers: Headers;
  options: RequestOptions;
  API_LINK: string = "http://localhost/kviz-znanja-rest/index.php/";
  
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'text/plain');
    this.options = new RequestOptions({ headers: this.headers });
   }

   get(link, params){
     var st = this.API_LINK + link;
     if(!(Object.keys(params).length === 0 && params.constructor === Object)){
       st += "?";
       var i=0;
        for (var k in params) {
          if (params.hasOwnProperty(k)) {
            st += k;
            st += "=";
            st += params[k];
            if(i < Object.keys(params).length - 1)
              st += "&";
          }
      }
    }
     return this.http.get(this.API_LINK + link)
       .pipe(map((res:Response) => res.json()));
   }

   post(link, data){
    return this.http.post(this.API_LINK + link, data, this.options)
    .pipe(map((res:Response) => res.json()));
   }
}
