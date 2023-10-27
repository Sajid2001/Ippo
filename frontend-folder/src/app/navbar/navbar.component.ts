import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavbarLink } from '../shared/navbarlink.model'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    private router:Router,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
    ) { 
      this.mobileView = this.breakpointObserver.isMatched([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
  }

  mobileView:boolean;
  menuOpened:boolean = false;

  user: string = '';

  navbarLinks:NavbarLink[] = [
    {
      path:"/",
      name:"Home"
    },
    {
      path:"/login",
      name:"Login"
    },
    {
      path:"/signup",
      name:"Sign Up"
    },
  ]

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(result => {
      this.mobileView = result.matches;
    });
  }

  isCurrentRoute(route:string):boolean{
    return this.router.url === route;
  }

  LoggedIn():boolean{
    this.user = localStorage.getItem('email') || "{}"
    return this.userService.loggedIn()
  }

  LogOut():void{
    this.userService.logoutUser();
    this.HandleMenu();
    this.router.navigate(['/login']); 
  }

  HandleMenu():void{
    this.menuOpened = !this.menuOpened;
  }

}
