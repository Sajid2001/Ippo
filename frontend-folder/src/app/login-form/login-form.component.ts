import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email:string = ''
  password:string = ''

  constructor(private snackbarService:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    console.log(this.email, this.password); 
    this.snackbarService.open("You have sucessfully logged in")
  }

}
