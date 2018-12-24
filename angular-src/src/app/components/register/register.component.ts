import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {NgFlashMessageService} from 'ng-flash-messages'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string
  email: string
  username: string
  password: string

  

  constructor(private validateService : ValidateService,
              private ngFlashMessageService : NgFlashMessageService,
              private authService: AuthService,
              private router : Router) { }

  ngOnInit() {
  }
  

  onRegisterSubmit(){
    const user = {
      name : this.name,
      username : this.username,
      password : this.password,
      email : this.email
    }
    //Required Fields
    if(!this.validateService.validateRegister(user)){
      console.log("Please Fill all the fields")
      this.ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please Fill all the fields"], 
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true, 
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      })
      return false
    }

    //Email Regex
    if(!this.validateService.validateEmail(user.email)){
      console.log("Please Enter Valid Email")
      this.ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please Enter Valid Email"], 
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true, 
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      })
      return false
    }
    //Register User
    this.authService.registerUser(user).subscribe((data: {success: boolean, msg: string})=>{
      if (data.success){
        console.log("Success")
      this.ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Success"], 
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true, 
        // Time after which the flash disappears defaults to 2000ms
        timeout: 5000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: "success"
      })
      this.router.navigate(['/login'])
      }
      else{
        console.log("Failure")
        this.ngFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Something Went Wrong"], 
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true, 
          // Time after which the flash disappears defaults to 2000ms
          timeout: 5000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        })
        this.router.navigate(['/register'])

      }
    })

  }

  



}
