import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NewBookmarkFormComponent } from '../new-bookmark-form/new-bookmark-form.component';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  openDialog(){
    this.dialog.open(NewBookmarkFormComponent);
  }

  ngOnInit(): void {
  }

}
