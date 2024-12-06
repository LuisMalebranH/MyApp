import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, ItemInventario } from 'src/app/services/data.service';

@Component({
    selector: 'app-agregar-item',
    templateUrl: './agregar-item.component.html',
    styleUrls: ['./agregar-item.component.scss'],
    standalone: false
})
export class AgregarItemComponent  implements OnInit {
  itemForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.itemForm = this.fb.group({
      nombreItem: ['', Validators.required],
      categoriaItem: ['', Validators.required],
      cantidadItem: [1, [Validators.required, Validators.min(1)]],
      tipoItem: ['', Validators.required],
      idInventario: ['', Validators.required], // ID del inventario asociado
    });
  }
  ngOnInit(): void {
    
  }

  async agregarItem() {
    if (this.itemForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    this.isLoading = true;
    const newItem: ItemInventario = this.itemForm.value;

    try {
      await this.dataService.addItemInventarioConImagen(newItem);
      console.log('Ítem agregado con éxito');
    } catch (error) {
      console.error('Error al agregar ítem:', error);
    } finally {
      this.isLoading = false;
    }
  }
}