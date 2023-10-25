import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';
import { Token } from '../shared/token.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email:string = ''
  password:string = ''

  constructor(
    private userService:UserService,
    private snackbarService:SnackbarService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    console.log(this.email, this.password);

    const newUser:User = {
      email:this.email, 
      password:this.password
    }
    
    this.userService.Register(newUser).subscribe(
      result => {
        localStorage.setItem('token', JSON.stringify(result))
        this.router.navigate([''])
      },
      err => console.log(err)
    )
    this.snackbarService.open("You have successfully signed up")
  }

}
