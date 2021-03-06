import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  apiURL: string = 'http://localhost:8000/api/'
  
  constructor(public http: HttpClient) { }

  httpHeaders: any = {
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    }
  }

  createPost( form ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.post( this.apiURL + 'createPost', form, this.httpHeaders);
  }

  showPost( id ): Observable<any> {
    return this.http.get( this.apiURL + 'showPost/'+ id, this.httpHeaders);
  }

  listPost(): Observable<any> {
    return this.http.get( this.apiURL + 'listPost', this.httpHeaders);
  }

  listFollowingPost(): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.get( this.apiURL + 'listFollowingPosts', this.httpHeaders);
  }

  commentInPost( id ): Observable<any> {
    return this.http.get( this.apiURL + 'commentInPost/'+ id, this.httpHeaders);
  }

  checkLikes( id, post_id ): Observable<any> {
    return this.http.get( this.apiURL + 'checkLikes/'+ id + '/' + post_id, this.httpHeaders);
  } 

  like(post_id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.put( this.apiURL + 'like/' + post_id, null, this.httpHeaders);
  }

  dislike(post_id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.delete( this.apiURL + 'dislike/' + post_id, this.httpHeaders);
  }

  numberLikes( id ): Observable<any> {
    return this.http.get( this.apiURL + 'numberLikes/'+ id, this.httpHeaders);
  }

  deletePost( id ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.delete( this.apiURL + 'deletePost/' + id, this.httpHeaders);
  }

  deleteComment( id ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken')
    return this.http.delete( this.apiURL + 'deleteComment/' + id, this.httpHeaders);
  }
}
