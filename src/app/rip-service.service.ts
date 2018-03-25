import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class RipServiceService {

  // To us Http we should import HttpModule in NgModule(ex: in app.module)
  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});

    // we are using put request bcouse usually its used to
    //(especialy in googlefirebase which is free back side emulator) 
    //update info and not replace it on server
    return this.http.put('https://alphaitangular.firebaseio.com/data.json',
      servers,
      // We can send header as second parameters
      { headers: headers });
  }
  getServers() {
    // making http get request

    return this.http.get('https://alphaitangular.firebaseio.com/data.json')
    // map is used to imitate catch after sucsribe luill be done on 
    // the function this map is called from,map functions will be done and dont
    // will be trown Reesponse object exactly
    .map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
    ).catch(
      (error: Response) => {
        // catch is used to catch errors and will throw error
        return Observable.throw('Something went wrong');
      }
      );
  }

}
