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
    if(!localStorage.getItem('accessToken')){
      return true;
    }
    this.router.navigate(['/shows'])
    return false;

    
  }
  
}
