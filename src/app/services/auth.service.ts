import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  async logout(){
    return this.afAuth.signOut();
  }


  getUser(){
    return this.afAuth.user; //observa el estado del usuario
  }

}
