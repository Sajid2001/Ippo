import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './shows/shows.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path:'',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
