import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service'
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
      private dataService: DataService
    ) {}
  
  
    async onSubmit(registerForm: NgForm) {
      if (registerForm.valid) {
        // llama los metodos de data service
        this.dataService.addUsuario(this.Usuario);
        console.log('User registered:', this.Usuario);
  
        // Show a success toast notification
        const toast = await this.toastController.create({
          message: 'Cuenta creada exitosamente para ' + this.Usuario.email,
          duration: 2000,
          position: 'top',
        });
        toast.present();
  
        // Clear the form after submission
        this.Usuario = { nombre: '', email: '', password: '' };
        registerForm.resetForm();
      }
    }
  
    // Optional function to handle manual user registration (if needed separately)
    registerUser() {
      const newUser = {
        email: 'user@example.com',
        nombre: 'John Doe',
        password: 'password123'
      };
  
      // Add the user using the data service
      this.dataService.addUsuario(newUser);
      console.log('User registered:', this.dataService.getUsuario());  // Assuming getUsers() returns the list of users
    }
  }