import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
//import { Filesystem, Directory } from '@capacitor/filesystem';
//import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})



export class ServicioCamara{
  imagenCapturada: string = '';
  constructor(){}



 public async addNewToGallery(){ 

  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
}

}
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}


/* try {
  const image = await Camera.getPhoto({
     quality: 90,
     allowEditing: true,
     resultType: CameraResultType.DataUrl,
     source:CameraSource.Prompt
   });
 
 
   this.imagenCapturada = image.dataUrl!;
   console.log('Imagen capturada:', this.imagenCapturada);
   // image.webPath will contain a path that can be set as an image src.
   // You can access the original file using image.path, which can be
   // passed to the Filesystem API to read the raw data of the image,
   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
   // var imageUrl = image.webPath;
 
   // Can be set to the src of an image now
 } catch (error) {
   console.error('Error capturing image:', error);
     }
 */