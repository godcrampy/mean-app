import { Injectable } from '@angular/core';
//add httpclient instead of http as in video 7 
import { HttpClient } from '@angular/common/http';
// add httpheader instead of headers as in video 7
import {HttpHeaders} from '@angular/common/http'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any
  user: any

  constructor(private http : HttpClient) { } 

  registerUser(user){
    // use httpheader instead of headers as in video 7
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe(map(res => res))
  }
}
 