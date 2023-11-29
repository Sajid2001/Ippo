import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookmarkService } from '../../services/bookmark.service';
import { JikanService } from '../../../../shared/services/jikan.service';
import { Bookmark } from '../../../../shared/models/bookmark.model';
import { JikanResult } from '../../../../shared/models/jikanresult.model';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-new-bookmark-form',
  templateUrl: './new-bookmark-form.component.html',
  styleUrls: ['./new-bookmark-form.component.css']
})
export class NewBookmarkFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewBookmarkFormComponent>,
    private bookmarkService: BookmarkService,
    private jikanService: JikanService,
    private snackbarService:SnackbarService,
    private breakpointObserver: BreakpointObserver,
  ) { 
    this.observeBreakpoints();
  }

  errors: { [key: string]: string } = {};
  searchName:string = '';
  loading:boolean = false;
  searchResults:JikanResult[] = [];
  visibleResults:JikanResult[] = [];
  
  newBookmark: Bookmark = {
    name:'',
    episodesWatched:0,
    timeStamp:"00:00:00",
    showType:"",
    malUrl:"",
    customUrl:"",
    lastSeenDescription:'',
    imageUrl:''
  };

  observeBreakpoints():void{
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      if(result.matches){
        this.visibleResults = this.searchResults.slice(0,2)
      }else{
        this.visibleResults = this.searchResults;
      }
    })
  }

  episodesVisible():boolean{
    if(this.newBookmark.showType === 'TV' || this.newBookmark.showType === 'OVA' || this.newBookmark.showType == 'ONA'){
      return true;
    }
    return false;
  }

  timestampVisible():boolean{
    if(this.newBookmark.showType === 'Movie' || this.newBookmark.showType === 'Special'){
      return true;
    }
    return false;
  }

  numericValue: string = '';

  onSearch():void{
    this.loading = true;
    this.jikanService.getJikanResultsByName(this.searchName).subscribe((results) => {
      this.searchResults = results;
      this.observeBreakpoints();
    },(error) =>{
      console.log(error);
    }, () => {
      this.loading = false;
    })
  }

  resetFields():void{
    this.newBookmark.timeStamp = "00:00:00"
    this.newBookmark.episodesWatched = 0
    this.errors = {}
  }
    
  selectItem(item: JikanResult): void {
    
    this.newBookmark.name = item.title;
    this.newBookmark.showType = item.type;
    this.newBookmark.malUrl = item.url;
    this.newBookmark.imageUrl = item.image_url;
    
    this.resetFields();

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.bookmarkService.addBookmark(this.newBookmark).subscribe((addedBookmark) => {
      this.loading = false;
      this.bookmarkService.emitBookmarkAdded(addedBookmark);
      this.errors = {}
      this.dialogRef.close();
      this.snackbarService.open("You successfully created a new bookmark!")
    }, (error) => {
      console.log(error.error);
      this.errors = error.error;
      this.loading = false;
    });
  }

}
