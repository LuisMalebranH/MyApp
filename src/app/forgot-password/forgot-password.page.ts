import { Component } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';
  message: string = '';

  constructor(private afAuth: AngularFireAuth, 
              private toastController: ToastController, 
              private router: Router,
            ) {}

  async resetPassword() {
    try {
      // Enviar el correo de recuperación de contraseña
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.message = 'Se ha enviado un enlace de recuperación a tu correo.';
      this.showToast();
    } catch (error) {
      console.error(error);
      this.message = 'Hubo un error, por favor intenta de nuevo.';
      this.showToast();
    }
  }
  async showToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}

