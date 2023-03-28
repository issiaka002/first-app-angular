import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users:AppUser[]=[];
  authenticatedUser: AppUser| undefined;

  constructor() {
    this.users.push({userId:UUID.UUID(), username:"user1", password:"1234", roles:["USER"]});
    this.users.push({userId:UUID.UUID(), username:"user2", password:"1234", roles:["USER"]});
    this.users.push({userId:UUID.UUID(), username:"admin", password:"1234", roles:["USER", "ADMIN"]});
   }


  public login(username:string, password:string): Observable<AppUser>{
    let userapp=this.users.find(u => u.username==username);
    if(!userapp) return throwError(()=>new Error("User not found"));
    if(userapp.password!=password) {throwError(()=> new Error("Bad credentials"))};
    return of(userapp);
  }

  //..Garder la session d'un utilisateur
  public authenticateUser(appuser:AppUser) : Observable<Boolean>{
    this.authenticatedUser=appuser;
    localStorage.setItem("authUser", JSON.stringify({username:appuser.username, roles:appuser.roles, jwt:"JWT_TOKEN"}));
    return of(true);
  }

  //..Avoir les roles d'un user authentifier
  public hasRole(role:string): boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  //..Savoir si un utilisateur est authentifier ou non
  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }

  //..Deconnexion
  public logout(): Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }

}

