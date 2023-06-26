import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { GacetaService } from 'src/app/services/core/gaceta.service';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.scss']
})
export class SliderAddComponent implements OnInit {
  id: string = null;
  fileselect: boolean=false;
  selectedFile: File | undefined;
  frmSlider!: FormGroup;
  formData: FormData;
  constructor
  (
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
    this.frmSlider = this.formBuilder.group({
      id: new FormControl(null),
      description: new FormControl('',[Validators.required]),
      image: new FormControl(null)
    });
    this.formData = new FormData();
  }

  async loadData() {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Entra a actualizar id de la foto');
    console.log(this.id);
    try {
     if (this.id != null) {
        try {
          var response = await this.gacetaService.getSliderById(this.id).toPromise();
          if (response.success) {
           this.spinner.hide();
            this.frmSlider.patchValue(response.data);
          } else {
            this.id = null;
            this.notification.error({ text: response.message }).then(result => {
              this.router.navigate(['/slider']);
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
    if(this.frmSlider.valid &&  this.fileselect==true){
      if(this.id == null){
        this.formData.append('id', Guid.create().toString());
        this.formData.append('description',this.frmSlider.value.description);
        this.gacetaService.addSlider(this.formData).subscribe(
          response => {
            if (response.success) {
              this.notification.success({ text: '¡Información guardada correctamente!.'});
              this.router.navigate(['/slider']);
              this.frmSlider.reset();
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
        this.formData.append('description',this.frmSlider.value.description);
        console.log("datos de actualizacion");
        console.log(this.formData);
        this.gacetaService.updateSlider(this.formData).subscribe(
          response => {
            if(response.success){
              this.notification.success({text: '¡Información guardada correctamente!'});
              this.router.navigate(['/slider']);
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
  clearFileLabel() {
    this.selectedFile = null;
    const fileInput = (document.getElementById('pdfInput') as HTMLInputElement);
    // if (fileInput) {
    //   fileInput.value = '';
    // }
    fileInput.value = '';
  }
  clickCancel() {
    this.router.navigate(['/slider'])
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log("se agrega el pdf al formdata");
    this.selectedFile = file;
    this.formData.append('image',this.selectedFile);
    this.fileselect=true;
  }
}
