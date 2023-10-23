import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email:string = ''
  password:string = ''

  constructor(private snackbarService:SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    console.log(this.email, this.password);
    this.snackbarService.open("You have successfully signed up")
  }

}
