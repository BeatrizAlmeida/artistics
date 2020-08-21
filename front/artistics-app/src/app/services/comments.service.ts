import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiURL: string = 'http://localhost:8000/api/'

  constructor(public http: HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  }

  createComment( form ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.post( this.apiURL + 'createComment', form, this.httpHeaders);
  }

}
