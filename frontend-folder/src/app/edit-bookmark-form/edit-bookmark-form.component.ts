import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../services/bookmark.service';
import { SnackbarService } from '../services/snackbar.service';
import { ConfirmDialogService } from '../services/confirm-dialog.service';


@Component({
  selector: 'app-edit-bookmark-form',
  templateUrl: './edit-bookmark-form.component.html',
  styleUrls: ['./edit-bookmark-form.component.css']
})
export class EditBookmarkFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditBookmarkFormComponent>,
    private bookmarkService: BookmarkService,
    private snackbarService: SnackbarService,
    private confirmDialogService: ConfirmDialogService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.bookmark = data.bookmark; 
    this.episodeNumber = this.bookmark.episodesWatched;
    this.description = this.bookmark.lastSeenDescription;
    this.timeStamp = this.bookmark.timeStamp;
    this.customUrl = this.bookmark.customUrl;
  }

  
  errors: { [key: string]: string } = {};
  bookmark: Bookmark;
  episodeNumber:number;
  timeStamp: string;
  description:string;
  customUrl:string;

  Clear():void{
    this.bookmark.episodesWatched = 0;
    this.bookmark.lastSeenDescription = "";
    this.bookmark.customUrl = "";
    this.bookmark.timeStamp = "00:00:00";
    this.bookmarkService.editBookmark(this.bookmark).subscribe((editedBookmark) => {
      this.bookmarkService.emitBookmarkEdited(editedBookmark);
      this.snackbarService.open("You have successfully cleared this bookmark")
      this.dialogRef.close();
    },(error) => {
      console.log(error.error);
      this.errors = error.error;
    });
  }

  Delete():void{
    this.bookmarkService.deleteBookmark(this.bookmark).subscribe((deletedBookmark) => {
      this.bookmarkService.emitBookmarkDeleted(deletedBookmark);
      this.dialogRef.close();
      this.snackbarService.open("You have successfully deleted this bookmark")
    })
  }


  onSubmit(): void {
    this.bookmark.episodesWatched = this.episodeNumber;
    this.bookmark.lastSeenDescription = this.description;
    this.bookmark.customUrl = this.customUrl;
    this.bookmark.timeStamp = this.timeStamp;
    
    this.bookmarkService.editBookmark(this.bookmark).subscribe((editedBookmark) => {
      this.bookmarkService.emitBookmarkEdited(editedBookmark);
      this.dialogRef.close();
      this.snackbarService.open("You have successfully updated this bookmark")
    },(error) => {
      console.log(error.error);
      this.errors = error.error;
    });
  }

  openClearConfirmationDialog():void{
    this.confirmDialogService.openConfirmDialog('Clear Bookmark', 'Are you sure you want to clear this bookmark?', () => {this.Clear()})
  }

  openDeleteConfirmationDialog(): void {
    this.confirmDialogService.openConfirmDialog('Delete Bookmark', 'Are you sure you want to delete this bookmark?', () => {this.Delete()})
  }
  
  ngOnInit(): void {
  }

}
