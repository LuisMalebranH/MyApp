import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationExtras} from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';


interface Usuario {
  usuario: string;
  email: string;
  password: string;
}
/*Mover interface a un archivo único de Typescript en caso de necesitarla en el futuro, si no, solo se queda aca,
que sea un problema para el luis del futuro*/ 

@Component({
    selector: 'app-home',
    templateUrl: './usuario.page.html',
    styleUrls: ['./usuario.page.scss'],
    standalone: false
})
export class UsuarioPage implements OnInit, AfterViewInit {
  showElement = false;
  documents: { name: string }[] = [
    { name: 'Usuario' },
    { name: 'Password' },
    { name: 'Inventarios' }
  ];

  usuario : Usuario = { usuario: '', email:'', password: '' };

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
    private animationCtrl: AnimationController) 
    {}
    //const animation: Animation = this.animationCtrl.create()
    //.addElement(myElementRef)
    //.duration(1000)
    //.fromTo('opacity', '1', '0.5');
     

  esconderPassword(password: string): string {
    if (password) {
      return password ? '*'.repeat(password.length) : '';  // enmascara cada caracter con asteristos
    }
    return '';
  }

  ngOnInit() {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd){
      const navigation = this.router.getCurrentNavigation();

      if (navigation?.extras?.state) {
        const state =navigation.extras.state as { user : Usuario };
        this.usuario = state?.user || { usuario: '', password: '' }; /* esto es un crimen que voy a arreglar despues*/

        /*let navigationExtras: NavigationExtras = {
          state: {user: this.login}
        }; */
        console.log(navigation.extras.state);
        console.log('Datos usuario:', this.usuario);

        if (this.usuario) {
          this.documents = this.documents.map(doc => {
            if (doc.name === 'Usuario') {
              return { name: this.usuario.usuario ?? 'Usuario' }; 
            } else if (doc.name === 'Password') {
              return { name: this.esconderPassword(this.usuario.password || '')}; 
            } else {
              return doc;
            }
          });
        }
      } else {
        console.log('no state found');
      }
    }
 });
}

  ngAfterViewInit() {
    // Elementos que corren despues de que la vista se inicialize 
  }
  async presentActionSheet(document: { name: string }) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: document.name,
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.moveDocumentModal(document);
            console.log('Move clicked');
          }
        },
        {
          text: 'Cambiar',
          handler: () => {
            // Wait until the action sheet dismisses
            this.actionSheetCtrl.dismiss().then(() => {
              this.renombrar(document);
              console.log('Rename clicked');
            });
            return false;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async moveDocumentModal(document: { name: string }) {
    const modal = await this.modalCtrl.create({
      component: 'ModalNavPage',
      componentProps: { page: 'MoveDocumentPage' }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.toastCtrl.create({
          message: `"${document.name}" moved to folder "${data.data.name}"`,
          duration: 2000
        }).then(toast => toast.present());
      }
    });
    await modal.present();
  }

  async renombrar(document: { name: string }) {
    const alert = await this.alertCtrl.create({
      header: 'Renombrar Campo',
      inputs: [
        {
          name: 'Renombrar Campo',
          placeholder: 'Renombrar Campo',
          value: document.name
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            document.name = data.title;
            console.log('Save clicked');
          }
        }
      ]
    });
    await alert.present();
  }
}