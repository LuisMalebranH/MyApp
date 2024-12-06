import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service'
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  

    Usuario = {
      email: '',
      nombre: '',
      password: ''
    };
  
    constructor(
      private toastController: ToastController, 
      private dataService: DataService,
      private authService: AuthService
    ) {}
  
  
    async onSubmit(registerForm: NgForm) {
      if (registerForm.valid) {
        try{

          await this.authService.registrar(this.Usuario.email, this.Usuario.password);
          // llama los metodos de data service
          await this.dataService.addUsuario(this.Usuario);
          console.log('Usuario registrado:', this.Usuario);
    
          // Show a success toast notification
          const toast = await this.toastController.create({
            message: 'Cuenta creada exitosamente para ' + this.Usuario.email,
            duration: 2000,
            position: 'top',
          });
          toast.present();
    
          // Clear the form after submission
          this.Usuario = {nombre: '', email: '', password: '' };
          registerForm.resetForm();
        } catch (error) {
          console.error('Error registrando usuario:', error);
          const errorToast = await this.toastController.create({
        message: 'Error al registrar el usuario. Por favor intente nuevamente.',
        duration: 2000,
        position: 'top',
          });
          errorToast.present();
        }
      }
    }
  
    // Función opcional para registrar al usuario en base de datos
    registrarUsuario() {
      const nuevoUsuario = {
        email: 'user@example.com',
        nombre: 'John Doe',
        password: 'password123'
      };
  
      // Añadir al usuario al localStorage
      this.dataService.addUsuario(nuevoUsuario);
      console.log('Usuario registrado:', this.dataService.getUsuario());  
    }
  }