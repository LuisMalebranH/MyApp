import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { AgregarItemComponent } from 'src/app/componentes/agregar-item/agregar-item.component';

@NgModule({
  declarations: [AppComponent, AgregarItemComponent],


  imports: [BrowserModule, 
            BrowserAnimationsModule, 
            IonicModule.forRoot(), 
            FormsModule,
            AppRoutingModule, 
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAuthModule,
            ReactiveFormsModule
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
