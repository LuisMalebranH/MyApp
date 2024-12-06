import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: false
})
export class TabsPage {

  constructor(    private modalController: ModalController,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {}

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
}
