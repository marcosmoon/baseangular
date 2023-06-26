import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { GacetaService } from 'src/app/services/core/gaceta.service';

export interface DialogData {
  urlImage: string;
  status: boolean;
}

@Component({
  selector: 'app-slider-show-image',
  templateUrl: './slider-show-image.component.html',
  styleUrls: ['./slider-show-image.component.scss']
})
export class SliderShowImageComponent implements OnInit {
  number: string = '';
  urlImage: string = '';
  idImage: string = "";
  status: boolean = false;
  imageSrc: any;
  dataa;

  constructor(
    public dialogRef: MatDialogRef<SliderShowImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer:DomSanitizer,
    private gacetaService : GacetaService,
    ) {
    this.idImage = data.urlImage;
    this.status = data.status;
    console.log("Imagen recibida: " + this.urlImage);
    
  }
    
  ngOnInit(): void {
    this.show_Image(this.idImage);
  }

  cancel_image(): void {
    this.status = false;
    this.dialogRef.close({urlImage: this.urlImage, status: this.status});
  }
  accept_image(): void {
    this.status = true;
    this.dialogRef.close({urlImage: this.urlImage, status: this.status});
  }
  get_out(): void {
    this.dialogRef.close(null);
  }

  show_Image(id_file: string) {
    console.log('id de la imagen');
    console.log(id_file);
    this.gacetaService.GetDownloadImage(id_file).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(blob);
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }

}
