import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';  
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 


import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ShowsComponent } from './features/show-feature/shows/shows.component';
import { ShowCardComponent } from './features/show-feature/show-card/show-card.component';
import { HomeHeroComponent } from './features/show-feature/home-hero/home-hero.component';
import { NewBookmarkFormComponent } from './features/show-feature/new-bookmark-form/new-bookmark-form.component';
import { EditBookmarkFormComponent } from './features/show-feature/edit-bookmark-form/edit-bookmark-form.component';
import { StreamLinksComponent } from './features/show-feature/stream-links/stream-links.component';
import { LoginPageComponent } from './features/user-auth-feature/login-page/login-page.component';
import { LoginFormComponent } from './features/user-auth-feature/login-form/login-form.component';
import { SignupPageComponent } from './features/user-auth-feature/signup-page/signup-page.component';
import { SignupFormComponent } from './features/user-auth-feature/signup-form/signup-form.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ConfirmDialogComponent } from './features/show-feature/confirm-dialog/confirm-dialog.component';
import { TokenInterceptor } from './token.interceptor';
import { LandingPageComponent } from './features/landing-page-feature/landing-page/landing-page.component';
import { LandingHeroComponent } from './features/landing-page-feature/landing-hero/landing-hero.component';
import { WhyUsComponent } from './features/landing-page-feature/why-us/why-us.component';
import { SearchDemoComponent } from './features/landing-page-feature/search-demo/search-demo.component';
import { LinksDemoComponent } from './features/landing-page-feature/links-demo/links-demo.component';
import { LandingFaqComponent } from './features/landing-page-feature/landing-faq/landing-faq.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { ShowTableComponent } from './features/show-feature/show-table/show-table.component';


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
    LandingPageComponent,
    LandingHeroComponent,
    WhyUsComponent,
    SearchDemoComponent,
    LinksDemoComponent,
    LandingFaqComponent,
    NotFoundPageComponent,
    ShowTableComponent,
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
    ReactiveFormsModule,
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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatButtonToggleModule
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
