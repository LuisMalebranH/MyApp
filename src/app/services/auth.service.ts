import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth) { }
  async login(email: string, password: string);{
    return this.afAuth.signInwithEmailAndPassword(email,password);
  }
  async logout(){
    return this.afAuth.signOut;
  }
  getUser(){
    return this.afAuth.user; //observa el estado del usuario
  }

}
