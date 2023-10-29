import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  open(message:string){
    this._snackBar.open(message, 'Close', {
      duration: 2500,
      panelClass: ['custom-snackbar'],
    });
  }

}
