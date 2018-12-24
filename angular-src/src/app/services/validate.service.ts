import { Injectable } from '@angular/core';
import { User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  validateRegister(user : User){
    if(user.name == undefined || user.email == undefined || user.password == undefined || user.username == undefined ){
      return false
    }
    else {
      return true
    }
  }

  validateEmail(email : string){
    const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regex.test(email)
  }

  constructor() { }
}
