import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {NgFlashMessageService} from 'ng-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String
  password: String

  constructor(private authService : AuthService,
              private router : Router,
              private ngFlashMessageService : NgFlashMessageService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password : this.password
    }

    this.authService.authenticateUser(user).subscribe((data: {success: boolean, msg: string, token: string, user: {}})=>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user)
        this.ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Login Successful"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 5000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: "success"
        })
        this.router.navigate(['/dashboard'])

      }
      else {
        this.ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Invalid Username or Password"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 5000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: "danger"
        })
        this.router.navigate(['/login'])
      }
    })

}} 