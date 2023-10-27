import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email:string = ''
  password:string = ''
  error:string = ''

  constructor(
    private userService: UserService,
    private snackbarService:SnackbarService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    console.log(this.email, this.password); 

    const user:User = {
      email:this.email,
      password:this.password
    }

    this.userService.Login(user).subscribe(
      result => {        
        localStorage.setItem('token', result.token)
        localStorage.setItem('email', result.email)
        this.router.navigate([''])
        this.snackbarService.open("You have sucessfully logged in")
      },
      (err) => {
        this.error = err.error.error
      }  
    )
    
  }

}
