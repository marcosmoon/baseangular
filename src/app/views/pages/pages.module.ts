import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AuthService } from 'src/app/services/authentication/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgOtpInputModule } from  'ng-otp-input';

import { NgxCaptchaModule } from 'ngx-captcha';
import { GacetaIndexComponent } from './gaceta-index/gaceta-index.component';
import { GacetaIndexPdfComponent } from './gaceta-index-pdf/gaceta-index-pdf.component';
import { GacetaFooterComponent } from './containers/default-layaout-gaceta/gaceta-footer/gaceta-footer.component';
import { GacetaHeaderComponent } from './containers/default-layaout-gaceta/gaceta-header/gaceta-header.component';
import { DefaultLayaoutGacetaComponent } from './containers/default-layaout-gaceta';
import { GacetaHistoriaComponent } from './gaceta-historia/gaceta-historia.component';
import { GacetaFestividadesComponent } from './gaceta-festividades/gaceta-festividades.component';
import { GacetaFormasVestirComponent } from './gaceta-formas-vestir/gaceta-formas-vestir.component';

// import {
//   GacetaFooterComponent,
//   GacetaHeaderComponent,
//   DefaultLayaoutGacetaComponent,
// } from './containers/index';

// const APP_CONTAINERS = [
//   GacetaFooterComponent,
//   GacetaHeaderComponent,
//   DefaultLayaoutGacetaComponent,
// ];
@NgModule({
  declarations: [
    LoginComponent,
    //...APP_CONTAINERS,
    Page404Component,
    GacetaIndexComponent,
    GacetaIndexPdfComponent,
    GacetaFooterComponent,
    GacetaHeaderComponent,
    DefaultLayaoutGacetaComponent,
    GacetaHistoriaComponent,
    GacetaFestividadesComponent,
    GacetaFormasVestirComponent,
  ],
  imports: [
    NgxCaptchaModule,
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgOtpInputModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [
    AuthService
  ],
  exports: [DefaultLayaoutGacetaComponent]
})
export class PagesModule {
}
