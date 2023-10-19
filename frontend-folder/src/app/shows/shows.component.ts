import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';

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
  filteredBookmarks: Bookmark[] = this.bookmarks; 

  ngOnInit() {
    this.retrieveBookmarks();

    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Web]).subscribe(() => {
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
      const index = this.bookmarks.findIndex((bookmark) => bookmark.id === editedBookmark.id);
  
      // Update the bookmark in the array with the edited one
      if (index !== -1) {
        this.bookmarks[index] = editedBookmark;
      }
    });
  }

  deleteBookmark(): void {
    this.bookmarkService.bookmarkDeleted$.subscribe((deletedBookmark) => { 
      console.log(deletedBookmark.id); // Log the ID
      const index = this.bookmarks.findIndex((bookmark) => bookmark.id === deletedBookmark.id);
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
      this.filteredBookmarks = this.bookmarks; 
    },
    (error) => {
      console.log(error);
    },
    ()=>{
      this.loading = false;
    });
  }

  getGridCols(): number {
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      return 1; // 1 column for mobile view
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      return 3; // 3 columns for desktop view
    } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      return 4; // 2 columns for other screen sizes
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      return 5; // 2 columns for other screen sizes
    }
    else {
      return 0
    }
  }

  // Function to filter bookmarks based on searchText
  filterBookmarks() {
    this.filteredBookmarks = this.bookmarks.filter((bookmark) =>
      bookmark.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
