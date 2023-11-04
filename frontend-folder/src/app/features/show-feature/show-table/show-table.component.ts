import { Component, Input, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.css']
})
export class ShowTableComponent implements OnInit {

  constructor() { }

  @Input() bookmarks!: Bookmark[];

  ngOnInit(): void {
  }

}
