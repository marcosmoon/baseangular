import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { GacetaService } from 'src/app/services/core/gaceta.service';

@Component({
  selector: 'app-gaceta-index-pdf',
  templateUrl: './gaceta-index-pdf.component.html',
  styleUrls: ['./gaceta-index-pdf.component.scss']
})
export class GacetaIndexPdfComponent implements OnInit {
  pdfData = [];
  urlImage: string = '';
  constructor(
    private router: Router,
    public dialog: MatDialog, 
    private notification: NotificationsService,
    private gacetaService: GacetaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.get_data();
  }

  get_data() {
    console.log("antes de llamar al servicio");
    this.gacetaService.getAllPdfs().subscribe(
      (response: any) => {
        this.spinner.hide();
        console.log("Entra a traer los datos");
        console.log(response.data);
        response.data.forEach((gaceta: any) => {
          this.pdfData.push({
            id: gaceta.id,
            title: gaceta.title,
            description: gaceta.description,
            description2: gaceta.description2,
            pdfFile: gaceta.pdfFile
          });
        });
      },
      (error: any) => {
        this.spinner.hide();
        console.error("Error al obtener los datos:", error);
      }
    );
  }

  show_image(image: string, number: string) {
    if (image == null) return;
    this.urlImage = image;
    console.log(this.urlImage);
    this.show_Image(this.urlImage);
  }
  
  show_Image(id_file: string) {
    console.log("imprimo el id de file");
    console.log(id_file);
    this.gacetaService.GetDownloadFile(id_file).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      (error) => {
        console.error('Error al obtener el archivo PDF:', error);
      }
    );
  }
}
