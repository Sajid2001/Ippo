import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private router: Router
  ){}

  canActivate(): boolean{
    if(!localStorage.getItem('token')){
      return true;
    }
    this.router.navigate([''])
    return false;

    
  }
  
}
