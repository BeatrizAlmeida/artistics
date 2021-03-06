import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  apiURL: string = 'http://localhost:8000/api/'
  
  httpHeaders: any = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  }

  constructor(public http: HttpClient) { }

  register( form ): Observable<any> {
    return this.http.post( this.apiURL + 'register', form, this.httpHeaders);
  }

  login( form ): Observable<any> {
    return this.http.post( this.apiURL + 'login', form, this.httpHeaders);
  }

  logout(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.get( this.apiURL + 'logout', this.httpHeaders);
  }

  profile(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.get( this.apiURL + 'getDetails', this.httpHeaders);
  }

  updateUser( form ): Observable<any> {
    console.log(form);
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.put( this.apiURL + 'updateUser', form,  this.httpHeaders);
  }

  showUser(id): Observable<any> {
    this.httpHeaders.headers['Access-Control-Allow-Origin']="*";
    return this.http.get( this.apiURL + 'showUser/' + id, this.httpHeaders);
  }
}
