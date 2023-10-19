import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JikanResult } from '../shared/jikanresult.model';
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
}
