import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookmarkService } from '../services/bookmark.service';
import { JikanService } from '../services/jikan.service';
import { Bookmark } from '../shared/bookmark.model';
import { JikanResult } from '../shared/jikanresult.model';


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
  ) { }

  errors: { [key: string]: string } = {};
  searchName:string = ''
  loading:boolean = false;
  searchResults:JikanResult[] = []
  
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

  numericValue: string = '';

  onSearch():void{
    this.loading = true;
    this.jikanService.getJikanResultsByName(this.searchName).subscribe((results) => {
      this.searchResults = results;
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
    }, (error) => {
      console.log(error.error);
      this.errors = error.error;
      this.loading = false;
    });
  }

}
