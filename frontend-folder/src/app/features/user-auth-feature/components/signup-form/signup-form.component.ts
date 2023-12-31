import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/user.model';
import { Token } from '../../../../shared/models/token.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email:string = ''
  password:string = ''
  errors: { [key: string]: string } = {};
  loading:boolean = false;

  constructor(
    private userService:UserService,
    private snackbarService:SnackbarService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.loading = true
    const newUser:User = {
      email:this.email, 
      password:this.password
    }
    
    this.userService.Register(newUser).subscribe(
      result => {
        localStorage.setItem('accessToken', result.accessToken)
        localStorage.setItem('refreshToken', result.refreshToken)
        localStorage.setItem('email', result.email)
        this.router.navigate(['/shows'])
        this.snackbarService.open("You have successfully signed up")
      },
      (err) => {
        console.log(err);
        this.errors = err.error;
        this.loading = false;
      }, () => {
        this.loading = false
      }
    )
  }

}
