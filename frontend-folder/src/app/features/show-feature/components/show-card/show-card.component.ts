import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '../../../../shared/models/bookmark.model';
import {MatDialog} from '@angular/material/dialog';
import { BookmarkService } from 'src/app/features/show-feature/services/bookmark.service';



@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {

  @Input() bookmark!: Bookmark;

  constructor(
    private bookmarkService: BookmarkService,
    private dialog:MatDialog
    ) { }

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
    this.bookmarkService.openEditDialog(this.bookmark);
  }
  
  openLinksDialog(){
    this.bookmarkService.openLinksDialog(this.bookmark);
  }

  ngOnInit(): void {
  }

}
