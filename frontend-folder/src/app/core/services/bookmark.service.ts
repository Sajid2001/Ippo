import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Bookmark } from '../../shared/models/bookmark.model';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditBookmarkFormComponent } from 'src/app/features/show-feature/edit-bookmark-form/edit-bookmark-form.component';
import { StreamLinksComponent } from 'src/app/features/show-feature/stream-links/stream-links.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})

export class BookmarkService {


  private apiUrl:string = environment.apiUrl;
  

  private bookmarkAddedSubject = new Subject<Bookmark>();
  bookmarkAdded$ = this.bookmarkAddedSubject.asObservable();

  private bookmarkEditedSubject = new Subject<Bookmark>();
  bookmarkEdited$ = this.bookmarkEditedSubject.asObservable();

  private bookmarkDeletedSubject = new Subject<Bookmark>();
  bookmarkDeleted$ = this.bookmarkDeletedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) {}

  getBookmarks(): Observable<Bookmark[]> {
    const url = `${this.apiUrl}/bookmarks`;
    return this.http.get<Bookmark[]>(url);
  }

  addBookmark(bookmark: Bookmark):  Observable<Bookmark> {
    const url = `${this.apiUrl}/bookmarks`;
    return this.http.post<Bookmark>(url, bookmark, httpOptions);
  }

  editBookmark(bookmark: Bookmark):  Observable<Bookmark> {
    const url = `${this.apiUrl}/bookmarks/${bookmark.showId}`;
    return this.http.put<Bookmark>(url, bookmark, httpOptions);
  }

  deleteBookmark(bookmark: Bookmark):  Observable<Bookmark> {
    const url = `${this.apiUrl}/bookmarks/${bookmark.showId}`;
    return this.http.delete<Bookmark>(url, httpOptions);
  }

  emitBookmarkAdded(addedBookmark: Bookmark) {
    this.bookmarkAddedSubject.next(addedBookmark);
  }

  emitBookmarkEdited(editedBookmark: Bookmark) {
    this.bookmarkEditedSubject.next(editedBookmark);
  }

  emitBookmarkDeleted(deletedBookmark: Bookmark) {
    this.bookmarkDeletedSubject.next(deletedBookmark)
  }

  openEditDialog(bookmark: Bookmark):void{
    const dialogRef = this.dialog.open(EditBookmarkFormComponent, {
      data: { bookmark: bookmark }
    });
  }

  openLinksDialog(bookmark: Bookmark){
    const dialogRef = this.dialog.open(StreamLinksComponent,{
      data:{
        name:bookmark.name,
        id: bookmark.showId,
        customUrl: bookmark.customUrl
      }
    })
  }


}
