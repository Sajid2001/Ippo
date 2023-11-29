import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-faq',
  templateUrl: './landing-faq.component.html',
  styleUrls: ['./landing-faq.component.css']
})
export class LandingFaqComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  faqPanels: {title: string, description: string}[] = [
    {
      title:"What is Ippo",
      description:"Ippo is an anime tracking website that makes keeping up with your anime much easier due to it's ability to quickly serve streaming links directly to you!"
    },
    {
      title:"How much does Ippo cost?",
      description:"Ippo is a completely free service. You do not need to pay for anything."
    },
    {
      title:"How do I use Ippo?",
      description:"Ippo is relatively simple to use. Just search up any anime you would like to keep track of, add in any additional information you need, and create a new bookmark. For more information, refer to our Github repository, which is linked in the footer"
    },
    {
      title:"What anime can I track on Ippo?",
      description:"Ippo uses the Jikan API, which scrapes all its information from MyAnimeList. Any anime that is listed on MAL is an anime you can track."
    },
    {
      title:"How can I contribute to Ippo?",
      description:"You can find our Github repository in the footer of this website. There you will find instructions on how you can contribute to the project"
    },
  ]

  onClick():void{
    this.router.navigate(['/signup'])
    .then(() => {
      window.scrollTo(0,0);
    });
  }

  ngOnInit(): void {
  }

}
