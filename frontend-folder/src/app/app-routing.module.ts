import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './features/show-feature/components/shows/shows.component';
import { SignupPageComponent } from './features/user-auth-feature/components/signup-page/signup-page.component';
import { LoginPageComponent } from './features/user-auth-feature/components/login-page/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { LandingPageComponent } from './features/landing-page-feature/components/landing-page/landing-page.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path:'',
    component:LandingPageComponent,
    canActivate:[LoggedInGuard],
  },
  {
    path:'shows',
    component: ShowsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component: SignupPageComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path:'login',
    component: LoginPageComponent,
    canActivate:[LoggedInGuard]
  },
  { 
    path: 'not-found', 
    component: NotFoundPageComponent
  },
  { 
    path: '**', 
    redirectTo: 'not-found'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
