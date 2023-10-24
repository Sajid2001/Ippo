import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import {MatDialog} from '@angular/material/dialog';
import { EditBookmarkFormComponent } from '../edit-bookmark-form/edit-bookmark-form.component';
import { StreamLinksComponent } from '../stream-links/stream-links.component';



@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {

  @Input() bookmark!: Bookmark;

  constructor(private dialog:MatDialog) { }

  timestampPattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    episodesVisible():boolean{
    if(this.bookmark.showType === 'TV' || this.bookmark.showType === 'ONA' || this.bookmark.showType === 'OVA'){
      return true;
    }
    return false;
  }

  timestampVisible():boolean{
    if(this.bookmark.showType === 'Movie' || this.bookmark.showType === 'Special'){
      return true;
    }
    return false;
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditBookmarkFormComponent, {
      data: { bookmark: this.bookmark } // Pass the bookmark data to the dialog
    });
  }
  
  openLinksDialog(){
    const dialogRef = this.dialog.open(StreamLinksComponent,{
      data:{
        name:this.bookmark.name,
        id: this.bookmark.id,
        customUrl: this.bookmark.customUrl
      }
    })
  }

  ngOnInit(): void {
  }

}
