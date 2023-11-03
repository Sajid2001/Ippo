import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-demo',
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.css']
})
export class SearchDemoComponent implements OnInit {

  constructor(
    private breakpointObserver:BreakpointObserver
  ) {
    this.observeBreakpoints();
   }

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

  visibleResults:{name:string, imageUrl:string}[] = this.searchResults;

  observeBreakpoints():void{
    this.breakpointObserver.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(result => {
      if(result.matches){
        this.visibleResults = this.searchResults.slice(0,2)
      }else{
        this.visibleResults = this.searchResults;
      }
    })
  }

  ngOnInit(): void {
  }

}
