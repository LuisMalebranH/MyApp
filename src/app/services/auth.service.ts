import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async login(correo: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(correo,password);
  }

  async logout (email: string, password: string) {
    return this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.user; //Revisa si el pelmazo esta conectado
  }
}
