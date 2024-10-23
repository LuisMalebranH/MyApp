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

  createData (data :any ) : Promise<any>{
    return this.firestore.collection('items').add(data);
  }

  
  // güetiar los Arrays
  getUsuario() {
    return this.firestore.collection('usuarios').valueChanges();
  }

  getInventario() {
    return this.inventory;
  }

  getImagen() {
    return this.images; // cambiar para que funcione con imagenes
  }

  // añadir cosas a los arrays
  addUsuario(usuarios: Usuario) {
    this.usuarios.push(usuarios);
    return this.firestore.collection('users').add(usuarios);
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

/*
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';

 async takePicture(PromptLabelHeader: String) {
 return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.dataUrl,
    source:CameraSource.prompt,
    PromptLabelHeader
    PromptLabelPhoto
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;

  // Can be set to the src of an image now
  imageElement.src = imageUrl;
};
*/