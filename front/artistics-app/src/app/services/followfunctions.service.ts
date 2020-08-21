import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowfunctionsService {

  apiURL: string = 'http://localhost:8000/api/'
  
  httpHeaders: any = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  }

  constructor(public http: HttpClient) { }

  follow( id ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.get( this.apiURL + 'follow/' + id , this.httpHeaders );
  }

  unfollow( id ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.delete( this.apiURL + 'unfollow/' + id , this.httpHeaders);
  }

  numberFollowers( id ): Observable<any> {
    return this.http.get( this.apiURL + 'numberFollowers/' + id);
  }

  numberFollowing( id ): Observable<any> {
    return this.http.get( this.apiURL + 'numberFollowing/' +  id);
  }

  checkFollowing( id ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.get( this.apiURL + 'checkFollowing/' +  id , this.httpHeaders);
  }

}
