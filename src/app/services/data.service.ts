import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import {Observable, firstValueFrom, lastValueFrom} from 'rxjs';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ServicioCamara } from './camara.service'

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

  constructor(private firestore: AngularFirestore,
              private camaraService: ServicioCamara
  ) {}
  
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

    async addItemInventarioConImagen(itemInventario: ItemInventario): Promise<void> {
      try {
        // Captura una foto desde la cámara
        const imagenBase64 = await this.camaraService.capturarFoto();
        if (imagenBase64) {
          // Sube la imagen a Firebase Storage
          const imagePath = `inventarios/${itemInventario.idInventario}/${Date.now()}.jpeg`;
          const urlImagen = await this.addImage(imagenBase64, imagePath);
          
          // Asigna la URL de la imagen al ítem y guárdalo en Firestore
          itemInventario.imagenItem = urlImagen;
        }
        // Guarda el ítem en Firestore
        await this.firestore.collection('itemsInventario').add(itemInventario);
        console.log('Ítem añadido con imagen:', itemInventario);
      } catch (error) {
        console.error('Error al añadir ítem con imagen:', error);
      }
    }
   
    async addImage(base64Image: string, path: string): Promise<string> {
      const storage = getStorage();
      const storageRef = ref(storage, path);
      await uploadString(storageRef, base64Image, 'data_url');
      return await getDownloadURL(storageRef);
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
        console.warn('Pelmazo con el correo ${email} no existe o es temporal');
        return;
      }
      await referenciaUsuario.delete();
      console.log('Usuario ${email} ha sido eliminado');
    }

    borrarInventario(inventarioId: string): Promise<void> {
      return this.firestore.collection('inventario').doc(inventarioId).delete();
    }

    borrarItemInventario(itemInventarioId: string): Promise<void> {
      return this.firestore.collection('itemsInventario').doc(itemInventarioId).delete();
  }
  
}

