import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../shared/token.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private userService: UserService
    ) {  
  }

  user:Token = JSON.parse(this.userService.getToken() || '{}');

  ngOnInit(): void {

  }

  LoggedIn():boolean{
    return this.userService.loggedIn()
  }

  LogOut():void{
    this.userService.logoutUser();
    this.router.navigate(['/login']); 
  }

}
