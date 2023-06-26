import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { ITicketUpdateResponse } from 'src/app/interfaces/ITicketUpdateResponse';
import { GacetaService } from 'src/app/services/core/gaceta.service';
import { Title } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gaceta-add',
  templateUrl: './gaceta-add.component.html',
  styleUrls: ['./gaceta-add.component.scss']
})
export class GacetaAddComponent implements OnInit {
  id: string = null;
  selectedFile: File | undefined;
  frmFile!: FormGroup;
  public currentDate = new Date();
  formData: FormData;
  fileselect: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationsService,
    private gacetaService: GacetaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadData();
  }
  loadForm() {
    this.frmFile = this.formBuilder.group({
      id: new FormControl(null),
      title: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required]),
      description2: new FormControl(''),
      pdf: new FormControl(null),
      creationDate: new FormControl(''),
    });
    this.formData = new FormData();
  }

  async loadData() {
     this.id = this.route.snapshot.paramMap.get('id');
     try {
      if (this.id != null) {
         try {
            this.spinner.show();
           var response = await this.gacetaService.getGacetaById(this.id).toPromise();
           if (response.success) {
            this.spinner.hide();
             this.frmFile.patchValue(response.data);
           } else {
             this.id = null;
             this.notification.error({ text: response.message }).then(result => {
               this.router.navigate(['/dashboard']);
             });
           }
         } catch (error) {
           console.error("Error al obtener los registros:", error);
         }
       }
     } catch (error) {
       console.error("Error al cargar los datos:", error);
     }
  }

  saveData() {
    if(this.id!=null){
      this.fileselect=true;
    }
    if(this.frmFile.valid &&  this.fileselect==true){
      if(this.id == null){
        console.log("Entra a guardar el archivo");
        console.log("Imprimimos el formData");
        console.log(this.formData);
        this.formData.append('id', Guid.create().toString());
        this.formData.append('title',this.frmFile.value.title);
        this.formData.append('description',this.frmFile.value.description);
        this.formData.append('description2',this.frmFile.value.description2);
        this.formData.append('creationDate', this.currentDate.toISOString());
        this.gacetaService.addGaceta(this.formData).subscribe(
          response => {
            if (response.success) {
              this.notification.success({ text: '¡Información guardada correctamente!.'});
              this.router.navigate(['/dashboard']);
              this.frmFile.reset();
              this.clearFileLabel();
              
            } else {
              this.notification.error({ text: response.message });
            }
          },
          error => {
            console.error(error);
          }
        );
      }else{
        this.formData.append('id', this.id);
        this.formData.append('title',this.frmFile.value.title);
        this.formData.append('description',this.frmFile.value.description);
        this.formData.append('description2',this.frmFile.value.description2);
        this.formData.append('creationDate',this.frmFile.value.creationDate);
        console.log("datos de actualizacion");
        console.log(this.formData);
        this.gacetaService.updateGaceta(this.formData).subscribe(
          response => {
            if(response.success){
              this.notification.success({text: '¡Información guardada correctamente!'});
              this.router.navigate(['/dashboard']);
            }else{
              this.notification.error({ text: response.message });
            }
          }
        )
      }
    }else{
      this.notification.warning({text:"Complete los campos requeridos"});
    }
  }

  clickCancel() {
    this.router.navigate(['/dashboard'])
  }

  isEditing(): boolean {
    return this.id != null;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log("se agrega el pdf al formdata");
    this.selectedFile = file;
    this.formData.append('pdf', this.selectedFile);
    this.fileselect=true;
  }

  clearFileLabel() {
    this.selectedFile = null;
    const fileInput = (document.getElementById('pdfInput') as HTMLInputElement);
    // if (fileInput) {
    //   fileInput.value = '';
    // }
    fileInput.value = '';
  }
}
