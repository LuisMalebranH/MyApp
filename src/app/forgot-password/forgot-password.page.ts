import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email!: string;

  constructor(private toastController: ToastController) {}

  async onSubmit() {
    // Aquí puedes implementar la lógica para enviar un correo de recuperación
    if (this.email) {
      // Simula el envío de un correo
      const toast = await this.toastController.create({
        message: 'Se ha enviado un correo de recuperación a ' + this.email,
        duration: 2000,
        position: 'top',
      });
      toast.present();
      this.email = ''; // Limpiar el campo de entrada
    }
  }
}

