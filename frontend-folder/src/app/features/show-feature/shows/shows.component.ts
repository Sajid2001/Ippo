import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../../shared/models/bookmark.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { BookmarkService } from '../../../core/services/bookmark.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private bookmarkService: BookmarkService,
  ) { }

  bookmarks:Bookmark[] = [];
  loading:boolean = false;
  searchText: string = ''; 
  afterLoadText:string = "It appears like you do not have any bookmarks. Click the button above to create some.";
  filteredBookmarks: Observable<Bookmark[]> | undefined;

  myControl = new FormControl('')

  ngOnInit() {

    this.retrieveBookmarks();

    this.filteredBookmarks = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(() => {
      this.cdr.detectChanges(); 
    });

    this.pushNewBookmark();

    this.editSingleBookmark();

    this.deleteBookmark();
    
  }

  pushNewBookmark():void{
    this.bookmarkService.bookmarkAdded$.subscribe((addedBookmark) => {
      this.bookmarks.push(addedBookmark)
    });
  }

  editSingleBookmark():void{
    this.bookmarkService.bookmarkEdited$.subscribe((editedBookmark) => {
      // Find the index of the edited bookmark in the array
      const index = this.bookmarks.findIndex((bookmark) => bookmark.showId === editedBookmark.showId);
  
      // Update the bookmark in the array with the edited one
      if (index !== -1) {
        this.bookmarks[index] = editedBookmark;
      }
    });
  }

  deleteBookmark(): void {
    this.bookmarkService.bookmarkDeleted$.subscribe((deletedBookmark) => { 
      console.log(deletedBookmark.showId); // Log the ID
      const index = this.bookmarks.findIndex((bookmark) => bookmark.showId === deletedBookmark.showId);
      console.log(index); // Log the index
      if (index !== -1) {
        this.bookmarks.splice(index, 1);
      }
    });
  }
  
  retrieveBookmarks(): void {
    this.loading = true;
    this.bookmarkService.getBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
    },
    (error) => {
      console.log(error);
      this.loading = false;
      this.afterLoadText = "It appears something went wrong. Try again later."
    },
    ()=>{
      this.loading = false;
    });
  }

  getGridCols(): number {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      return 1; // 1 column for mobile view
    } else if (this.breakpointObserver.isMatched([Breakpoints.Small])) {
      return 2; // 3 columns for desktop view
    } else if (this.breakpointObserver.isMatched([Breakpoints.Large,Breakpoints.Medium])) {
      return 3; // 2 columns for other screen sizes
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      return 4; // 2 columns for other screen sizes
    }
    else {
      return 0
    }
  }

  private _filter(value: string): Bookmark[] {
    const filterValue = value.toLowerCase();
    return this.bookmarks.filter(bookmark => bookmark.name.toLowerCase().includes(filterValue));
  }

  // Function to filter bookmarks based on searchText
  // filterBookmarks() {
  //   this.filteredBookmarks = this.bookmarks.filter((bookmark) =>
  //     bookmark.name.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

}
