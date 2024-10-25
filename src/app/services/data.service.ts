import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

interface Usuario {

  email: string;
  nombre: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private usuarios: Usuario[] = [];
  private inventory: any[] = [];
  private images: string[] = [];  // Placeholder mientras se preparan los modulos para las imagenes.

  constructor(private firestore: AngularFirestore) {}
  
  // güetiar los Arrays

  /* Añadir /     Create */

  createData (data :any ) : Promise<any>{
    return this.firestore.collection('items').add(data);
  }
    // añadir cosas a los arrays
    addUsuario(usuarios: Usuario) {
      this.usuarios.push(usuarios);
      return this.firestore.collection('usuarios').add(usuarios);
    }
  
    addItemInventario(item: any) {
      this.inventory.push(item);
    }
  
    addImagen(image: string) {
      this.images.push(image); // cambiar para que funcione con imagenes
    }
  /* Leer Datos / Read */
    getUsuario() {
      return this.firestore.collection('usuarios').valueChanges();
    }

    getInventario() {
      return this.inventory;
    }

    getImagen() {
      return this.images; // cambiar para que funcione con imagenes
    }

  /* Actualizar / Update */
    async getUserData(userId: string) {
      ;
    }
    async updateUser(userId: string, updatedData: any) {
      ;
    }


  /* Borrar    /  Delete */



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