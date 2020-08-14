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

  logout( form ): Observable<any> {
    return this.http.post( this.apiURL + 'logout', form, this.httpHeaders);
  }
}
