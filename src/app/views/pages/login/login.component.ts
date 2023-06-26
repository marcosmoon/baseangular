import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { ILoginRequest } from 'src/app/interfaces/ILoginRequest';
import { IResponse } from 'src/app/interfaces/IResponse';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frmOperation!: FormGroup;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationsService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { 
    
  }

  ngOnInit() {
    this.loadForm();
    if (localStorage.getItem('currentUser')) {  
    }
    
  }

  loadForm() {
    this.frmOperation = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  login() {
    if (this.frmOperation.valid) {
      this.spinner.show();
      let loginUser: ILoginRequest = Object.assign({}, this.frmOperation.value);

      this.authService.login(loginUser).subscribe((response: IResponse<any>) => {
        
        if (response.success) {
          this.spinner.hide();
          localStorage.setItem('email',response.data.email)
          this.authService.saveJwt(response.data);
          this.authService.setUserData(response.data.userData);
          this.authService.setUserLogged(true);
          this.router.navigate(['/dashboard']);
          console.log("Datos del administrador rol")
          console.log(response.data.userData.rol.id);
          console.log(response.data.userData.rol.name);
          console.log("Datos admin");
          console.log(response.data.token);
        }
        else {
          this.notification.error({ text: response.message })
        }
      })
    } else {
      this.notification.warning({ text: 'Complete los campos requeridos' })
    }
  }
}
