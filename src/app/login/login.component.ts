import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { AppUser } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup!:FormGroup;
  users:AppUser[]=[];

  constructor(private fb:FormBuilder){
    this.users.push({userId:UUID.UUID(), username:"user1", password:"1234", roles:["USER"]});
    this.users.push({userId:UUID.UUID(), username:"user2", password:"1234", roles:["USER"]});
    this.users.push({userId:UUID.UUID(), username:"admin", password:"1234", roles:["USER", "ADMIN"]})
  };

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username:this.fb.control(""),
      password: this.fb.control("")
    })
  }

  handleLogin(){

  }
}
