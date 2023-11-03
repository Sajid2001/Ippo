import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<Token>(url, user, httpOptions);
  }

  Login(user:User): Observable<Token>{
    const url = `${this.authUrl}/login`;
    return this.http.post<Token>(url, user, httpOptions);
  }

  Refresh(refreshToken: string): Observable<{accessToken:string}> {
    if (refreshToken) {

      const url = `${this.authUrl}/refresh`;
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${refreshToken}`
        })
      };
  
      return this.http.get<{accessToken:string}>(url, httpOptions);

    } else {
      return new Observable<{accessToken:string}>((observer) => {
        observer.error('No refresh token available');
      });
    }
  }
  

  logoutUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email')
  }

  getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken')    
  }

}
