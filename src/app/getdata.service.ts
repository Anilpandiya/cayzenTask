import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GetDataService {

     private baseUrl = 'https://api.openaq.org/v1/measurements?limit=100000';

     constructor( public http :  HttpClient){}

     getinfo() : Observable<any>{
         
         return this.http.get(this.baseUrl).pipe(tap(data => console.log(data)));
     }


}
