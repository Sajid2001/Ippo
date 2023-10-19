import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { streamingPlatforms } from '../shared/streaming-platforms';
import { StreamLink } from '../shared/streamlink.model';
import { StreamlinkService } from '../services/streamlink.service';

@Component({
  selector: 'app-stream-links',
  templateUrl: './stream-links.component.html',
  styleUrls: ['./stream-links.component.css']
})
export class StreamLinksComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private streamLinkService: StreamlinkService 
  ) { 
    this.name = data.name;
    this.id = data.id;
    this.customUrl = data.customUrl;
  }

  name:string;
  id:number;
  streamLinks:StreamLink[] = []
  customUrl:string;
  loading:boolean = false;

  streamingPlatforms = streamingPlatforms;

  retrieveStreamLinks(): void {
    this.loading = true;
    this.streamLinkService.getStreamLinksByID(this.id).subscribe(
      (streamLinks) => {
        this.streamLinks = streamLinks;
      },
      (error) => {
        console.log(error);
      },
      () => {
        // This block will run when the API request is complete
        this.loading = false;
      }
    );
  }


  ngOnInit(): void {
    this.retrieveStreamLinks()
  }

}
