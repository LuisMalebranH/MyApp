import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}


/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: any[] = [];
  private inventory: any[] = [];
  private images: string[] = [];  // Placeholder mientras se preparan los modulos para als imagenes.

  constructor() {}

  // Methods to get arrays
  getUsers() {
    return this.users;
  }

  getInventory() {
    return this.inventory;
  }

  getImages() {
    return this.images;
  }

  // Methods to add data to arrays
  addUser(user: any) {
    this.users.push(user);
  }

  addInventoryItem(item: any) {
    this.inventory.push(item);
  }

  addImage(image: string) {
    this.images.push(image);
  }
} */