import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JikanResult } from '../models/jikanresult.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JikanService {

  private apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJikanResultsByName(name:string): Observable<JikanResult[]> {
    const url = `${this.apiUrl}/bookmarks?query=${name}`;
    return this.http.get<JikanResult[]>(url);
  }

  getJikanDemoResultsByName(name:string): Observable<{title:string, image_url:string}[]> {
    const url = `${this.apiUrl}/demo?query=${name}`;
    return this.http.get<{title:string, image_url:string}[]>(url);
  }
}
