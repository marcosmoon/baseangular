import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { SliderShowImageComponent } from './slider-show-image/slider-show-image.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GacetaService } from 'src/app/services/core/gaceta.service';


@Component({
  selector: 'app-slider-manage',
  templateUrl: './slider-manage.component.html',
  styleUrls: ['./slider-manage.component.scss']
})
export class SliderManageComponent implements OnInit {
  urlImage: string = '';
  status: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private notification: NotificationsService,
    private gacetaService: GacetaService,
    private spinner: NgxSpinnerService
  ) { }
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id','image', 'descripcion','editar','eliminar'];
  ngOnInit(): void {
    this.spinner.show();
    this.get_data();
  }

  clickAdd() {
    this.router.navigate(['/slider/imagen']);
  }

  get_data(){
    console.log("antes de llamar al servicio")
    this.gacetaService.getAllSlider().subscribe(async (response: any)=>{
      this.spinner.hide();
      console.log("Entra a traer los datos")
      console.log(response.data);
      this.dataSource = new MatTableDataSource(response.data) ;
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  show_image(image:string){
    if(image == null) return;

    this.urlImage = image;
    console.log(this.urlImage);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {urlImage: this.urlImage, status: this.status};
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';

    const dialogRef = this.dialog.open(SliderShowImageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        
      }else{
        console.log('No selecciono nada');
      }
    });
  }

  clickUpdate(path: string, id:string){
    this.router.navigate([
      '/slider/' + path,
      {id: id}
    ]);
  }

  clickDelete(id: string) {
    this.notification.warning({
      text: 'Esta seguro de eliminar el registro?'
    }).then(result => {
      if(result.isConfirmed){
        this.gacetaService.deleteSlider(id).subscribe(
      response => {
        if (response.success) {
          this.notification.success({text: 'Eliminación exitosa'});
          this.router.navigate['/slider']; 
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
