import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { NavbarComponent } from './navbar/navbar.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { NewBookmarkFormComponent } from './new-bookmark-form/new-bookmark-form.component';
import { EditBookmarkFormComponent } from './edit-bookmark-form/edit-bookmark-form.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { StreamLinksComponent } from './stream-links/stream-links.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShowsComponent,
    ShowCardComponent,
    HomeHeroComponent,
    NewBookmarkFormComponent,
    EditBookmarkFormComponent,
    ConfirmDeleteComponent,
    StreamLinksComponent,
    LoadingComponent,
  ],
  entryComponents:[
    NewBookmarkFormComponent
  ], 
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
