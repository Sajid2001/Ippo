import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StreamLink } from '../../shared/models/streamlink.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamlinkService {

  private apiUrl:string = environment.apiUrl;

  constructor(
    private http: HttpClient, 
  ) { }

  getStreamLinksByID(bookmark_id:number): Observable<StreamLink[]> {
    const url = `${this.apiUrl}/scrape/show/${bookmark_id}`;
    return this.http.get<StreamLink[]>(url);
  }
}
