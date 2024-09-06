import { Component, OnInit } from '@angular/core';
import { NavigationExtras} from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  login:any={
    usuario:"",
    password:""
  }

field:string="";
  constructor(public router:Router, public toastController:ToastController) { }

  ngOnInit() {
  }
  ingreso(){
    if(this.validateModel(this.login)){
      this.presentToast("top","Welcomepage@");
      let navigationExtras: NavigationExtras = {
        state: {user: this.login}
      };
      this.router.navigate(['/home'],navigationExtras);
    }else{
      this.presentToast("middle", "Error - Falta: " + this.field,5000);
    }
  }

  validateModel(model:any){
    for(var [key,value] of Object.entries(model)){
      if(value == ""){
        this.field = key;
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