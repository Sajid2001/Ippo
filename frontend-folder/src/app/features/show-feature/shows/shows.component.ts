import { Component, OnInit, ViewChild} from '@angular/core';
import { Bookmark } from '../../../shared/models/bookmark.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { BookmarkService } from '../../../core/services/bookmark.service';
import { FormControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  filteredBookmarks: Bookmark[] = [];
  selectedView = localStorage.getItem('selectedView') || 'grid';
  displayedColumns: string[] = ['image', 'name', 'showType', 'episodes', 'timestamp' , 'actions'];

  dataSource:any
  @ViewChild(MatTable) table! : MatTable<Bookmark>;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
 

  myControl = new FormControl('')

  ngOnInit() {
    
    this.retrieveBookmarks();

    this.pushNewBookmark();

    this.editSingleBookmark();

    this.deleteBookmark();

    this.myControl.valueChanges.subscribe((value: string) => {
      this.filteredBookmarks = this.filterItems(value);
      this.updateDatasource(this.filteredBookmarks);
    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(() => {
      this.cdr.detectChanges(); 
    });
    
  }

  pushNewBookmark():void{
    this.bookmarkService.bookmarkAdded$.subscribe((addedBookmark) => {
      this.bookmarks.push(addedBookmark)
      this.table.renderRows()
      this.filteredBookmarks = this.filterItems(this.myControl.value);
      if (this.selectedView == 'list'){
        this.updateDatasource(this.filteredBookmarks);
      }
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
      this.table.renderRows()
    });
  }

  deleteBookmark(): void {
    this.bookmarkService.bookmarkDeleted$.subscribe((deletedBookmark) => { 
      console.log(deletedBookmark.showId); // Log the ID
      const index = this.bookmarks.findIndex((bookmark) => bookmark.showId === deletedBookmark.showId);
      console.log(index); // Log the index
      if (index !== -1) {
        this.bookmarks.splice(index, 1);
        this.filteredBookmarks = this.filterItems(this.myControl.value);
        if (this.selectedView == 'list'){
          this.updateDatasource(this.filteredBookmarks);
        }
      }
      this.table.renderRows()
    });
  }
  
  retrieveBookmarks(): void {
    this.loading = true;
    this.bookmarkService.getBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
      this.filteredBookmarks = bookmarks;
      if (this.selectedView == 'list'){
        this.updateDatasource(this.filteredBookmarks);
      }
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

  filterItems(value: string): Bookmark[] {
    const filterValue = value.toLowerCase();
    return this.bookmarks.filter(bookmark => bookmark.name.toLowerCase().includes(filterValue));
  }

  updateDatasource(bookmarks:Bookmark[]):void{
    this.dataSource = new MatTableDataSource<Bookmark>(bookmarks)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  episodesVisible(bookmark: Bookmark):boolean{
    if(bookmark.showType === 'TV' || bookmark.showType === 'ONA' || bookmark.showType === 'OVA'){
      return true;
    }
    return false;
  }

  timestampVisible(bookmark: Bookmark):boolean{
    if(bookmark.showType === 'Movie' || bookmark.showType === 'Special'){
      return true;
    }
    return false;
  }

  openEditDialogList(bookmark: Bookmark){
    this.bookmarkService.openEditDialog(bookmark)
  }

  openLinksDialogList(bookmark: Bookmark){
    this.bookmarkService.openLinksDialog(bookmark)
  }

  storeView() {
      localStorage.setItem('selectedView', this.selectedView);  
      this.retrieveBookmarks();
      
  }
}
