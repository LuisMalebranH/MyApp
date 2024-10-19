import { Component, OnInit } from '@angular/core';
import { NavigationExtras} from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage {

  email: string = 'example@email.com';
  password: string = '';


 /* login:any={
    usuario:"",
    email:"",
    password:""}*/



  constructor(public router:Router, public toastController:ToastController, private authService: AuthService) { }

  ngOnInit() {}
  async login() {
    if (!this.email || !this.password) {
      this.presentToast('bottom', 'Por favor ingrese su correo y contraseña.');
      return;
    }

    try {
        await this.authService.login(this.email, this.password);
        console.log('Login exitoso');
        this.presentToast('top', 'Login exitoso');
        this.router.navigate(['/home']);  // 
    } catch (error) {
        console.error('Error de login:', error);
        this.presentToast('middle', 'Error de login. Intente nuevamente.');
      }
  
  }
    async logout(){
    
      await this.authService.logout();
      console.log('logout exitoso');
    }

    forgotPassword() {
      this.router.navigate(['/forgot-password']);
    }
    
    register(){
      this.router.navigate(['/register']);
    }


    validateModel(model:any){
      for(var [key, value] of Object.entries(model)){
        if(value === ''){
          this.presentToast('bottom', 'Error - Falta ${key}');
          return false;
        }
      }
      return true;
    }

  //notificaciones toast para cada accion, se escrie la posición y duración 
  async presentToast(position: 'top' |'middle' | 'bottom', msg:string, duration?:number){
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
    });
    await toast.present();
  }

  
}

/*ingreso(){
    if(this.validateModel(this.login)){
      this.presentToast("top","Bienvenido");
      let navigationExtras: NavigationExtras = {
        state: {user: this.login}
      };
      this.router.navigate(['/home'],navigationExtras);
    }else{
      this.presentToast("middle", "Error - Falta: " + this.field,1500);
    }
  }
  

  */

/*
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class Login Page {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      UsuarioCorreo: ['', [Validators.required, this.UsuarioCorreoValidator]]
    });
  }

  usuarioCorreoValidator(control: AbstractControl) {
    const value = control.value;
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const patronUsuario = /^[a-zA-Z0-9_]+$/;

    if (!value || (patronCorreo.test(value) || patronUsuario.test(value))) {
      return null; // valid
    } else {
      return { invalidoUsuarioCorreo: true }; // invalid
    }
  }
} */
/*

async login(){
  try{
    await this.authService.login(this.email,this.password);
    console.log('login exitoso');
}catch(error){
  console.error('error de login:'error);

}

}
async logout(){
  
    await this.authService.logout();
    console.log('logout exitoso');
}
}
*/