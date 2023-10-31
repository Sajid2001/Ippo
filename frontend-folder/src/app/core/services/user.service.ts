import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../../shared/models/token.model';
import { User } from '../../shared/models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private authUrl:string = environment.authUrl;

  Register(user:User): Observable<Token>{
    const url = `${this.authUrl}/register`;
    return this.http.post<Token>(url, user);
  }

  Login(user:User): Observable<Token>{
    const url = `${this.authUrl}/login`;
    return this.http.post<Token>(url, user);
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

}
