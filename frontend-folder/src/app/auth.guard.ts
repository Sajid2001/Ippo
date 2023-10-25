import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ){}

  canActivate(): boolean
    {
      if(localStorage.getItem('token')){
        return true;
      }
      this.router.navigate(['/login'])
      return false;
    
  }
  
}
