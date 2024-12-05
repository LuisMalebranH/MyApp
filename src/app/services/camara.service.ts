import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
//import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})




export class ServicioCamara{
  imagenCapturada: string = '';
  public photo: UserPhoto[] = [];
  constructor(){}

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
  
    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }
  
  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


 public async addNewToGallery(){ 

// Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri, // file-based data; provides best performance
    source: CameraSource.Camera, // automatically take a new photo with the camera
    quality: 100 // highest quality (0 to 100)
  });

  // Save the picture and add it to photo collection
  const savedImageFile = await this.savePicture(capturedPhoto);
  this.photo.unshift(savedImageFile);
}
async capturarFoto(): Promise<string | null> {
  try {
    const photo: Photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl, // Devuelve la foto en formato base64
      source: CameraSource.Camera,
      quality: 90,
    });
    return photo.dataUrl || null;
  } catch (error) {
    console.error('Error al capturar imagen:', error);
    return null;
  }
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