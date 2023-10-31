import { Component, OnInit } from '@angular/core';
import { StreamLink } from '../../../shared/models/streamlink.model';
import { streamingPlatforms } from '../../../shared/models/streaming-platforms';

@Component({
  selector: 'app-links-demo',
  templateUrl: './links-demo.component.html',
  styleUrls: ['./links-demo.component.css']
})
export class LinksDemoComponent implements OnInit {

  constructor() { }

  streamingPlatforms = streamingPlatforms;

  demoName:string = 'Dr. Stone'
  demoLinks: StreamLink[] = [
    {
      stream: "Crunchyroll",
      url:"https://www.crunchyroll.com/series/GYEXQKJG6"
    },
    {
      stream:"Funimation",
      url:"https://www.funimation.com/shows/dr-stone/"
    },
    {
      stream:"Google Play",
      url:"https://play.google.com/store/tv/show?id=nLGbwyTpXZZV_rK6z8NX8Q"
    },
    {
      stream:"Hulu",
      url:"https://www.hulu.com/series/dr-stone-148925d5-ea60-4277-b0f6-7b2ded20b2d0"
    }
  ]

  ngOnInit(): void {
  }

}
