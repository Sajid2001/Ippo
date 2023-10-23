import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  message:string;
  title:string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title:string, message:string}) { 
    this.title = data.title
    this.message = data.message
  }


  ngOnInit(): void {
  }

}
