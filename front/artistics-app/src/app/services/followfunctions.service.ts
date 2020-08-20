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

  /*followUser( id, follower_id ): Observable<any> {
    return this.http.put( this.apiURL + 'follow', id, follower_id);
  }

  unfollowUser( id, follower_id ): Observable<any> {
    return this.http.put( this.apiURL + 'unfollow', id, follower_id);
  }

  numberFollowers( id ): Observable<any> {
    return this.http.put( this.apiURL + 'numberFollowers', id, this.httpHeaders);
  }

  numberFollowing( id ): Observable<any> {
    return this.http.put( this.apiURL + 'numberFollowing', id, this.httpHeaders);
  }*/

  listFollowingPost(): Observable<any> {
    return this.http.put( this.apiURL + 'listFollowPost', this.httpHeaders)
  }

}
