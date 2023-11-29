import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { JikanService } from 'src/app/shared/services/jikan.service';

@Component({
  selector: 'app-search-demo',
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.css']
})
export class SearchDemoComponent implements OnInit {

  constructor(
    private breakpointObserver:BreakpointObserver,
    private jikanService:JikanService
  ) {
    this.observeBreakpoints();
   }
  
   searchText:string = ''
   loading:boolean = false;

  searchResults:{title:string, image_url:string}[] = [
    {
      title:"Jujutsu Kaisen 2nd Season",
      image_url:"https://cdn.myanimelist.net/images/anime/1792/138022l.jpg"
    },
    {
      title:"Spy X Family Season 2",
      image_url:"https://cdn.myanimelist.net/images/anime/1506/138982l.jpg"
    },
    {
      title:"Sousou No Frieren",
      image_url:"https://cdn.myanimelist.net/images/anime/1015/138006l.jpg"
    },
  ]

  visibleResults:{title:string, image_url:string}[] = this.searchResults;

  ngOnInit(): void {
  }

  observeBreakpoints():void{
    this.breakpointObserver.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(result => {
      if(result.matches){
        this.visibleResults = this.searchResults.slice(0,2)
      }else{
        this.visibleResults = this.searchResults;
      }
    })
  }

  onClick():void{
    this.loading = true;
    this.jikanService.getJikanDemoResultsByName(this.searchText).subscribe((results) => {
      console.log(results);
      this.searchResults = results;
      this.visibleResults = results;
      this.observeBreakpoints();
    }
    ,(error) => {
      console.log(error);
      this.loading = false;
    },() => {
      this.loading = false;
    })
  }

}
