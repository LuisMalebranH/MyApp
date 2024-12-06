import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AgregarItemComponent } from 'src/app/componentes/agregar-item/agregar-item.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: false
})
export class Tab1Page implements OnInit {
  items: any[] = [];
  categorias = ['Comida', 'revistas', 'herramientas'];
  filteredItems: any[] = [];
  selectedItem: any = null;
  isModalOpen = false;
  imagePreview: string | null = null;


  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  datosUsuario(){
    this.router.navigate(['/usuario']);
  }
  editarUsuario(){
    this.router.navigate(['/editar'])
  }
  menuConfig(){
    this.router.navigate(['/configuracion'])
  }
  inventario(){
    this.router.navigate(['/tabs/tab1'])
  }
  logout() {
    // Llama al servicio de autenticación para cerrar la sesión
    this.authService.logout();
  
    // Redirige a la página de login
    this.router.navigate(['/login']);
  }
  ngOnInit() {


    this.firestore
      .collection('items', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges({ idField: 'id' }) // Incluye el ID del documento
      .subscribe((data) => {
        this.items = data;
        this.filteredItems = [...this.items]; // Mostrar todos los ítems inicialmente
      });
  }

  filterBy(criteria: string) {
    if (criteria === 'favorites') {
      this.filteredItems = this.items.filter((item) => item.isFavorite); // Agrega propiedad `isFavorite` en Firebase
    } else if (criteria === 'rare') {
      this.filteredItems = this.items.filter((item) => item.rarity === 'rare'); // Agrega `rarity` a los datos
    } else {
      this.filteredItems = [...this.items]; // Restablece el filtro
    }
  }

  async openAddItemModal() {
    const modal = await this.modalController.create({
      component: AgregarItemComponent,
    });
    modal.onDidDismiss().then(() => {
      this.ngOnInit(); // Refresca los datos tras agregar un ítem
    });
    await modal.present();
  }

  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = null;
  }
}