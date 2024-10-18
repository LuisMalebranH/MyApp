import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: any[] = [];
  private inventory: any[] = [];
  private images: string[] = [];  // Placeholder mientras se preparan los modulos para las imagenes.

  constructor(private firestore: AngularFirestore) {}

  createData (data :any ) : Promise<any>{
    return this.firestore.collection('items').add(data);
  }

  
  // güetiar los Arrays
  getUsuario() {
    return this.users;
  }

  getInventario() {
    return this.inventory;
  }

  getImagen() {
    return this.images; // cambiar para que funcione con imagenes
  }

  // añadir cosas a los arryas
  addUsuario(user: any) {
    this.users.push(user);
  }

  addItemInventario(item: any) {
    this.inventory.push(item);
  }

  addImagen(image: string) {
    this.images.push(image); // cambiar para que funcione con imagenes
  }
}




/*
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: any[] = [];
  private inventory: any[] = [];
  private images: string[] = [];  // Placeholder mientras se preparan los modulos para als imagenes.

  constructor() {}

  // Methods to get arrays
  getUsers() {
    return this.users;
  }

  getInventory() {
    return this.inventory;
  }

  getImages() {
    return this.images;
  }

  // Methods to add data to arrays
  addUser(user: any) {
    this.users.push(user);
  }

  addInventoryItem(item: any) {
    this.inventory.push(item);
  }

  addImage(image: string) {
    this.images.push(image);
  }
} */