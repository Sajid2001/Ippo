import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-demo',
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.css']
})
export class SearchDemoComponent implements OnInit {

  constructor() { }

  searchResults:{name:string, imageUrl:string}[] = [
    {
      name:"Jujutsu Kaisen 2nd Season",
      imageUrl:"https://cdn.myanimelist.net/images/anime/1792/138022l.jpg"
    },
    {
      name:"Spy X Family Season 2",
      imageUrl:"https://cdn.myanimelist.net/images/anime/1506/138982l.jpg"
    },
    {
      name:"Sousou No Frieren",
      imageUrl:"https://cdn.myanimelist.net/images/anime/1015/138006l.jpg"
    },
  ]

  ngOnInit(): void {
  }

}
