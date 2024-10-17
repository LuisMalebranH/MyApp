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

/* import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  constructor(private dataService: DataService) {}

  registerUser(user: any) {
    this.dataService.addUser(user);
    console.log('User registered:', this.dataService.getUsers());
  }

  addInventoryItem(item: any) {
    this.dataService.addInventoryItem(item);
  }

  uploadImage(image: string) {
    this.dataService.addImage(image);
  }
} */
 // COmo alternativa usar local storage en caso de que firebase no funcione.
  /* 
  registerUser(user: any) {
  this.users.push(user);
  localStorage.setItem('users', JSON.stringify(this.users));
}

getUsersFromStorage() {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    this.users = JSON.parse(storedUsers);
  }
} */