import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-hero',
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.css']
})
export class LandingHeroComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onClick():void{
    this.router.navigate(['/signup'])
    .then(() => {
      window.scrollTo(0,0);
    });
  }

}
