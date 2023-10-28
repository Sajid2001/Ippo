import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

import { NavbarComponent } from './navbar/navbar.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { NewBookmarkFormComponent } from './new-bookmark-form/new-bookmark-form.component';
import { EditBookmarkFormComponent } from './edit-bookmark-form/edit-bookmark-form.component';
import { StreamLinksComponent } from './stream-links/stream-links.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TokenInterceptor } from './token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShowsComponent,
    ShowCardComponent,
    HomeHeroComponent,
    NewBookmarkFormComponent,
    EditBookmarkFormComponent,
    StreamLinksComponent,
    LoginPageComponent,
    LoginFormComponent,
    SignupPageComponent,
    SignupFormComponent,
    FooterComponent,
    ConfirmDialogComponent,
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
    MatSlideToggleModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
