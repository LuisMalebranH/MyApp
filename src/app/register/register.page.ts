import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private toastController: ToastController) {}

  async onSubmit() {
    // Aquí puedes implementar la lógica para registrar al usuario
    // Esto puede incluir llamar a un servicio que se comunique con tu backend
    if (this.user.name && this.user.email && this.user.password) {
      // Simular registro exitoso
      const toast = await this.toastController.create({
        message: 'Cuenta creada exitosamente para ' + this.user.email,
        duration: 2000,
        position: 'top',
      });
      toast.present();
      this.user = { name: '', email: '', password: '' }; // Limpiar el formulario
    }
  }
}

