import { Component, OnInit } from '@angular/core';
import { StreamLink } from '../../../../shared/models/streamlink.model';

@Component({
  selector: 'app-links-demo',
  templateUrl: './links-demo.component.html',
  styleUrls: ['./links-demo.component.css']
})
export class LinksDemoComponent implements OnInit {

  constructor() { }


  demoName:string = 'Dr. Stone'
  demoLinks: StreamLink[] = [
    {
      stream: "Crunchyroll",
      url:"https://www.crunchyroll.com/series/GYEXQKJG6",
      logoUrl:"https://u.livechart.me/streaming_service/248/logo/e0e43ed5e6191cea23520a1c91808779.png/medium.png",
      caption:"※ Sub & Dub"
    },
    {
      stream:"Funimation",
      url:"https://www.funimation.com/shows/dr-stone/",
      logoUrl:"https://u.livechart.me/streaming_service/3/logo/e2f079a83203d35e3756f0ba2de51647.png/medium.png",
      caption:"※ Dubbed (English)"
    },
    {
      stream:"Google Play",
      url:"https://play.google.com/store/tv/show?id=nLGbwyTpXZZV_rK6z8NX8Q",
      logoUrl:"https://u.livechart.me/streaming_service/29/logo/04a62f33df68eb99f5b7e6be60db0e9a.png/medium.png",
      caption:"※ Dubbed"
    },
    {
      stream:"Hulu",
      url:"https://www.hulu.com/series/dr-stone-148925d5-ea60-4277-b0f6-7b2ded20b2d0",
      logoUrl:"https://u.livechart.me/streaming_service/9/logo/725b0223cf5789213f5bc6c90c166496.png/medium.png",
      caption:"※ Sub & Dub (English)"
    }
  ]

  ngOnInit(): void {
  }

}
