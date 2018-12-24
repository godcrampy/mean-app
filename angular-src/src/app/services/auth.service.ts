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
    return this.http.post('https://localhost:3000/users/register', user, {headers: headers}).pipe(map(res => res))
  }

  authenticateUser(user){
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post('localhost:3000/users/authenticate', user, {headers: headers}).pipe(map(res => res))
  }

  getProfile(){
    let headers = new HttpHeaders()
    this.loadToken()
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json')
    return this.http.get('https://localhost:3000/users/profile', {headers: headers}).pipe(map(res => res))
  }


  storeUserData(token, user){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user = user
  }

  loadToken(){
    
    const token = localStorage.getItem('id_token')
    this.authToken = token;
  }

  logout(){
    this.authToken = null
    this.user = null
    localStorage.clear()
  }
}