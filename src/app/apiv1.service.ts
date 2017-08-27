import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Apiv1Service {
  ip: string = "localhost:3000";

  constructor(private http: Http) { }

  httpGet(url: string, funName: string): Promise<any> {
    let headers = new Headers();
    // headers.append("Authorization", "Basic " + btoa("admin:admin"));

    return this.http.get(url)
      .toPromise()
      .then(resp => {
        const result = resp.json();
        return Promise.resolve(result);
      })
      .catch(err => {
        console.error(`[ERROR] ${funName} `, err);
        return Promise.reject(err.message || err);
      });
  }

  getTwit(param: any): Promise<any[]>{
   let url = `http://${this.ip}/api/twi/search/?keyword=${param.keyword}`;
    return this.httpGet(url, "getTwit");
  }

  getTimeLine(): Promise<any[]>{
   let url = `http://${this.ip}/api/twi/timeline`;
    return this.httpGet(url, "getTimeLine");
  }

  getMentions(): Promise<any[]>{
   let url = `http://${this.ip}/api/twi/mentions`;
    return this.httpGet(url, "getMention");
  }

  search(searchWords: string): Promise<any[]>{
   let url = `http://${this.ip}/api/twi/search/${searchWords}`;
    return this.httpGet(url, "getSearch");
    // return this.http
    //            .get(url)
    //            .map(response => response.json().data as any[]);
  }

}
