import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  apiURL: string = 'http://localhost:8000/api/'
  
  httpHeaders: any = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  }

  constructor(public http: HttpClient) { }

  listUser(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.get( this.apiURL + 'listUser', this.httpHeaders);
  }

  showUser(id): Observable<any> {
    return this.http.get( this.apiURL + 'showUser/' + id);
  }

}
