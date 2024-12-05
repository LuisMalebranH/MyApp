import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationExtras} from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { ServicioCamara } from '../services/camara.service';
import { Animation, AnimationController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

interface Usuario {
  usuario: string;
  email: string;
  password: string;
}
/*Mover interface a un archivo único de Typescript en caso de necesitarla en el futuro, si no, solo se queda aca,
que sea un problema para el luis del futuro*/ 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
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
    private animationCtrl: AnimationController,
    private authService: AuthService, 
    public servicioCamara: ServicioCamara) 
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


    agregarFotoaGaleria(){

      this.servicioCamara.addNewToGallery();
    }

  // Función de logout
  logout() {
    // Llama al servicio de autenticación para cerrar la sesión
    this.authService.logout();

    // Redirige a la página de login
    this.router.navigate(['/login']);
  }
   
}

 








 /*   @Input() headerColor: string = '#F53D3D';
    @Input() textColor: string = '#FFF';
    @Input() contentColor: string = '#F9F9F9';
    @Input() title: string = ''; // Provide a default value or mark as optional
    @Input() hasMargin: boolean = true;
    @Input() expanded: boolean = false; // Initialize with a default value
  
    @ViewChild('accordionContent') elementView!: ElementRef; // Use the non-null assertion (`!`)
    
    viewHeight: number = 0; // Initialize with a default value
  
    constructor(public renderer: Renderer2) { }
  
    ngAfterViewInit() {
      this.viewHeight = this.elementView.nativeElement.offsetHeight;
  
      if (!this.expanded) {
        this.renderer.setStyle(this.elementView.nativeElement, 'height', '0px');
      }
    }
    
    ngOnInit() {}
  
    toggleAccordion() {
      this.expanded = !this.expanded;
      const newHeight = this.expanded ? this.viewHeight + 'px' : '0px';
      this.renderer.setStyle(this.elementView.nativeElement, 'height', newHeight);
    }
  } */