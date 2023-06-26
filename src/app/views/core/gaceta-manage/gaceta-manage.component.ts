import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { GacetaService } from 'src/app/services/core/gaceta.service';

@Component({
  selector: 'app-gaceta-manage',
  templateUrl: './gaceta-manage.component.html',
  styleUrls: ['./gaceta-manage.component.scss']
})
export class GacetaManageComponent implements OnInit {
  Id: string;
  urlImage: string = '';
  status: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table: any; 

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['id','title', 'description','description2','imageTicket','Fecha de creacion','editar','eliminar'];

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

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  get_data(){
    console.log("antes de llamar al servicio")
    this.gacetaService.getAllPdfs().subscribe(async (response: any)=>{
      this.spinner.hide();
      console.log("Entra a traer los datos")
      console.log(response.data);
      this.dataSource = new MatTableDataSource(response.data) ;
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
    });
  }
  clickUpdate(path: string, id:string){
    this.router.navigate([
      '/gacetas/' + path,
      {id: id}
    ]);
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

  clickAdd() {
    this.router.navigate(['/gacetas/gaceta']);
  }
  clickDelete(id: string) {
    this.notification.warning({
      text: 'Esta seguro de eliminar el registro?'
    }).then(result => {
      if(result.isConfirmed){
        this.gacetaService.deleteGaceta(id).subscribe(
      response => {
        if (response.success) {
          this.notification.success({text: 'Eliminación exitosa'});
          this.router.navigate['/dashboard']; 
          this.spinner.show();
          this.get_data();  
        } else {
          console.error('Error al eliminar:', response.message);
        }
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    }
    }); 
  }
}
