import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import {Observable, firstValueFrom, lastValueFrom} from 'rxjs';

export interface Usuario {

  email: string;
  nombre: string;
  password: string;
}

export interface Inventario {
  inventarioId?: string ;
  nombreInventario: string;
  ownerInventario: string; // para enlazarlo con el usuario dueño del inventario
}

export interface ItemInventario {

  itemInventarioId?:string;
  nombreItem: string;
  categoriaItem: string;
  cantidadItem: number;
  tipoItem: string;
  imagenItem: string; // Apuntar a la dirección de la imagen 
  idInventario: string;

}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private usuarios: Usuario[] = [];
  private inventario: Inventario[] = [];
  private itemInventario: ItemInventario[] = [];
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
   
    addInventario (inventario: Inventario) : Promise<any> {
      return this.firestore.collection ('inventario').add(inventario);
    }

    addItemInventario (itemInventario: ItemInventario) : Promise<any> {
      return this.firestore.collection ('itemsInventario').add(itemInventario);
    }
   
    addImagen(image: string) {
      this.images.push(image); // cambiar para que funcione con imagenes
    }


  /* Leer Datos / Read */
    getUsuario() {
      return this.firestore.collection('usuarios').valueChanges();
    }

    getInventario(ownerInventario: string): Observable<Inventario[]> {
      return this.firestore
      .collection<Inventario>('inventario', (ref) => ref.where('ownerInventario', '==', ownerInventario))
      .valueChanges({idField: 'id'});
       
    }

    getItemInventario(inventarioId: string) : Observable<ItemInventario[]> {
      return this.firestore.collection<ItemInventario>('itemsInventario', (ref) => ref.where('inventarioId', '==', inventarioId))
      .valueChanges({ idField: 'id'});
    }
    

 
    /* Actualizar / Update */
    
    async editarUsuario(userId: string, updatedData: Partial<Usuario>): Promise<void> {
      return this.firestore.collection('usuarios').doc(userId).update(updatedData);
    }

    async editarInventario(inventarioId: string, updatedData: Partial<Inventario>): Promise<void>{
      return this.firestore.collection('inventario').doc(inventarioId).update(updatedData);
    }

    async editarItemInventario(itemInventarioId: string, updatedData: Partial<ItemInventario>): Promise<void> {
      return this.firestore.collection('itemsInventario').doc(itemInventarioId).update(updatedData);
    }



    /* Borrar / Delete */

    async borrarUsuario(email: string): Promise<void> {
      const referenciaUsuario = this.firestore.collection('usuarios').doc(email);
      const usuarioTemporal = await firstValueFrom(referenciaUsuario.get());
      if (!usuarioTemporal.exists) {
        throw new Error('Pelmazo con el correo ${email} no existe');
      }
      else
        return referenciaUsuario.delete();
    }

    borrarInventario(inventarioId: string): Promise<void> {
      return this.firestore.collection('inventario').doc(inventarioId).delete();
    }

    borrarItemInventario(itemInventarioId: string): Promise<void> {
      return this.firestore.collection('itemsInventario').doc(itemInventarioId).delete();
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