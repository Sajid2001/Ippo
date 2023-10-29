import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { 

  }

  openConfirmDialog(title:string, message: string, action: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action(); 
      }
    });
  }
}
